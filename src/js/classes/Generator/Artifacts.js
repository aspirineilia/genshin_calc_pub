import { Artifact } from "../Artifact";
import { Condition } from "../Condition";
import { FeatureCompiler } from "../Feature2/Compiler";
import { isPercent, Stats } from "../Stats";

const MAX_ROLLS_TO_PUT_LOWEST = 2;
const MAX_STATS_PER_ARTIFACT = 4;
const MAX_UPGRADES_PER_ARTIFACT = 5;
const MAX_UPGRADES_TOTAL = MAX_UPGRADES_PER_ARTIFACT * 5;
const MAX_ROLLS = 45;
const MAX_REALLOCATE_LOOP = 10;

export class ArtifactGenerator {
    constructor(data) {
        this.build = data.build;
        this.combinations = data.combinations;
        this.featureName = data.feature;
        this.settings = data.settings;
        this.progressCallback = data.progressCallback;

        this.prepare();
    }

    prepare() {
        this.applySets();

        let feature = this.build.getFeatureByName(this.featureName);
        this.buildData = this.build.getBuildData();
        let postItems = this.buildData.getActivePostEffectsTree();

        let tree = feature.getTree(this.buildData);
        let compiler = new FeatureCompiler(tree, postItems);
        let usedStats = compiler.usedStats;
        let ensureStats = ['recharge'].concat(usedStats);
        this.buildData.stats.ensure(ensureStats);

        if (usedStats.includes('crit_value')) {
            this.calcCritValue = true;
            usedStats.push('crit_rate');
            usedStats.push('crit_dmg');
        }

        compiler.prepare(this.buildData);
        compiler.compile();
        this.compiled = compiler;

        this.usefulStats = [];
        this.uselessStats = [];
        this.statRolls = getStatRolls(this.settings.mode)

        for (let stat of DB.Artifacts.Substats.getKeys()) {
            if (usedStats.includes(stat)) {
                this.usefulStats.push(stat);
            } else {
                this.uselessStats.push(stat);
            }
        }

        this.progressTotal = this.combinations.length * this.usefulStats.length;
        this.progressCurrent = 0;
    }

    setsList() {
        let sets = Array.isArray(this.settings.sets) ? [].concat(this.settings.sets) : [];
        if (sets.length < 5) {
            let setKeys = [];
            for (let set of DB.Artifacts.Sets.getList()) {
                if (!set.isBeta()) {
                    setKeys.push(set.key)
                }
            }

            for (let setName of shuffle(setKeys)) {
                if (sets.includes(setName)) {
                    continue
                }

                let setData = DB.Artifacts.Sets.get(setName);
                if (setData.maxRarity < 5) {
                    continue;
                }

                sets.push(setName);
                if (sets.length >= 5) {
                    break;
                }
            }
        }
        return shuffle(sets);
    }

    applySets() {
        let sets = this.setsList();
        this.artifactSets = [].concat(sets);
        this.build.clearArtifacts();
        let stats = ['hp', 'atk'];

        for (let slot of DB.Artifacts.Slots.getKeys()) {
            let art = new Artifact(5, 20, slot, sets.shift() || '', stats.shift() || '', []);
            this.build.setArtifact(art);
        }

        let artConditions = this.build.getConditions({objects: 'artifacts'});
        let allSettings = Condition.allConditionsOn(artConditions);

        if (this.settings.required_sets_settings) {
            allSettings = Object.assign(allSettings, this.settings.required_sets_settings);
        }

        this.build.setArtifactsSettings(allSettings);
    }

    makeTestObject(combination, stats) {
        let testObj = new StatsObject(combination, this.usefulStats, this.usefulStats, this.statRolls, this.settings);
        if (!testObj.satisfyStat('recharge', this.minRecharge, stats) ) {
            return;
        }
        return testObj;
    }

    makeObject(combination, stats) {
        return new StatsObject(combination, this.usefulStats, this.uselessStats, this.statRolls, this.settings);
    }

    generate() {
        let result = [];

        let initialStatFunc = this.buildData.stats.getSetFunc();
        this.minRecharge = this.settings.minRecharge / 100;

        for (let combination of this.combinations) {
            let combinationStatFunc = getCombinationStatsFunc(combination);
            let maxObj;
            let maxValue = 0;

            for (let stat of this.usefulStats) {
                let stats = new Stats();
                let otherStatsCnt = this.usefulStats.length - 1;
                initialStatFunc(stats);
                combinationStatFunc(stats);

                let testObj = this.makeTestObject(combination, stats);
                if (!testObj) {
                    this.updateProgress();
                    continue;
                }

                let max = testObj.getStatRollsAllowed(stat);
                for (let i = 1; i <= max; ++i) {
                    let stats = new Stats();
                    initialStatFunc(stats);
                    combinationStatFunc(stats);

                    // let obj = new StatsObject(combination, this.usefulStats, this.uselessStats, this.statRolls, this.settings);
                    let obj = this.makeObject(combination, stats);
                    obj.satisfyStat('recharge', this.minRecharge, stats);

                    for (let j = 0; j < i; j++) {
                        let rollValue = obj.addRoll(stat);
                        stats.add(stat, rollValue);
                    }

                    let featureValue;
                    if (otherStatsCnt > 0) {
                        while (1) {
                            let rolls = obj.getAllowedRolls(stat);
                            if (rolls.length == 0) break;

                            let bestStat;
                            [bestStat, featureValue] = this.getBestRoll(stats, rolls);
                            if (!bestStat) break;

                            let rollValue = obj.addRoll(bestStat);
                            stats.add(bestStat, rollValue);
                        }
                    } else {
                        this.buildData.stats = stats;
                        featureValue = this.compiled.execute(this.buildData)[2];
                    }

                    if (featureValue > maxValue) {
                        maxValue = featureValue;
                        maxObj = obj;
                    }
                }

                this.updateProgress();
            }

            if (maxObj) {
                result.push({
                    value: maxValue,
                    mainStats: combination,
                    rollsPerStat: maxObj.getDistribution(),
                    artifacts: maxObj.makeArtifacts(this.setsList()),
                });
            }
        }

        return result.sort((a, b) => {return b.value - a.value});
    }

    getBestRoll(stats, rolls) {
        let result;
        let max = 0

        for (let roll of rolls) {
            stats.add(roll.stat, roll.value);
            if (this.calcCritValue) {
                stats.set('crit_value', stats.get('crit_rate') * 2 + stats.get('crit_dmg'));
            }

            this.buildData.stats = stats;
            let featureValue = this.compiled.execute(this.buildData)[2];
            if (featureValue > max) {
                max = featureValue;
                result = roll.stat;
            }

            stats.add(roll.stat, -1 * roll.value);
        }

        return [result, max];
    }

    updateProgress() {
        ++this.progressCurrent;
        if (this.progressCallback) {
            this.progressCallback({
                total: this.progressTotal,
                completed: this.progressCurrent,
            });
        }
    }
}

export class StatsObject {
    constructor(combination, usefulStats, uselessStats, statValues, settings) {
        this.mainStats = {
            flower: 'hp',
            plume: 'atk',
            ...combination,
        };
        this.usefulStats = usefulStats;
        this.uselessStats = uselessStats;
        this.rollsCnt = 0;
        this.rolls = {};
        this.statValues = statValues;
        this.stats = new Stats();
        this.settings = settings;
    }

    getMainStatsCnt(stat) {
        let result = 0;
        for (let s of Object.values(this.mainStats)) {
            if (stat == s) ++result;
        }
        return result;
    }

    getStatMaxAllowed(stat) {
        let maxBySettings = this.settings.count;
        let maxByStat = MAX_ROLLS;
        let maxByMainStat = (5 - this.getMainStatsCnt(stat)) * (1 + MAX_UPGRADES_PER_ARTIFACT);

        if (stat == 'crit_rate' || stat == 'crit_dmg') {
            maxByStat = this.settings.critRolls;
        }

        return Math.min(maxBySettings, maxByStat, maxByMainStat);
    }

    getStatRollsAllowed(stat) {
        let used = 0;
        if (stat == 'crit_rate' || stat == 'crit_dmg') {
            used += this.rolls.crit_rate ? this.rolls.crit_rate.length : 0;
            used += this.rolls.crit_dmg ? this.rolls.crit_dmg.length : 0;
        } else {
            used = this.rolls[stat] ? this.rolls[stat].length : 0;
        }

        return this.getStatMaxAllowed(stat) - used;
    }

    getAllowedRolls(exclude) {
        let result = [];

        if (this.rollsCnt >= this.settings.count) {
            return result;
        }

        // let upgradesCnt = Math.max(0, Object.keys(this.rolls).length - 4);
        let upgradesCnt = 0;
        for (let stat of Object.keys(this.rolls)) {
            let used = this.rolls[stat].length;
            for (let mainStat of Object.values(this.mainStats)) {
                if (stat != mainStat) --used;
            }

            upgradesCnt += Math.max(0, used);
        }

        for (let stat of DB.Artifacts.Substats.getKeys()) {
            if (exclude && exclude == stat) continue;
            if (!this.usefulStats.includes(stat)) continue;

            if (upgradesCnt >= MAX_UPGRADES_TOTAL && this.rolls[stat]) continue;

            let value = this.getRollValue(stat);
            let allowed = this.getStatRollsAllowed(stat);
            if (allowed > 0) {
                result.push({stat: stat, value: value});
            }
        }

        return result;
    }

    getRollValue(stat) {
        let cnt = this.statValues[stat].length;

        if (cnt > 1) {
            let used = 1 + (this.rolls[stat] ? this.rolls[stat].length : 0);
            let index = used % cnt;
            return this.statValues[stat][index];
        }

        return this.statValues[stat][0];
    }

    satisfyStat(stat, value, total) {
        let current = total.getTotal(stat);

        while (current - value < -0.001) {
            if (this.getStatRollsAllowed(stat) <= 0) {
                return false;
            }

            let rollValue = this.addRoll(stat);
            current += rollValue;
            total.add(stat, rollValue);
        }

        return true;
    }

    addRoll(stat) {
        let value = this.getRollValue(stat);

        if (!this.rolls[stat]) { this.rolls[stat] = []; }
        this.rolls[stat].push(value);
        ++this.rollsCnt;
        this.stats.add(stat, value);

        return value;
    }

    getDistribution() {
        let result = {};
        for (let [stat, rolls] of Object.entries(this.rolls)) {
            result[stat] = rolls.length;
        }
        return result;
    }

    getDistibutor() {
        return new StatDistributor(this.mainStats, this.rolls);
    }

    makeArtifacts(setsList) {
        let result = [];

        let dist = this.getDistibutor();
        dist.process();
        dist.fillUselessStats(this.uselessStats, this.statValues);

        for (let slot of Object.keys(this.mainStats)) {
            let art = new Artifact(5, 20, slot, setsList.shift(), this.mainStats[slot], []);
            for (let [stat, rolls] of Object.entries(dist.result[slot])) {
                let value = rolls.reduce((s, i) => {return s + i});

                if (isPercent(stat)) {
                    value = Math.round(value * 10000) / 100;
                    value = Math.round(value * 10) / 10;
                    value = parseFloat(value.toFixed(1));
                } else {
                    value = Math.round(value);
                }

                art.addStat(stat, value);
            }
            result.push(art);
        }

        return result;
    }
}

export class StatDistributor {
    constructor(mainStats, rolls) {
        this.mainStats = mainStats;
        this.rolls = {};

        for (let stat of Object.keys(rolls)) {
            this.rolls[stat] = [].concat(rolls[stat]);
        }

        this.prepare();
        this.result = {
            plume: {},
            flower: {},
            sands: {},
            goblet: {},
            circlet: {},
        };
        this.rollsCount = {plume: 0, flower: 0, sands: 0, goblet: 0, circlet: 0};
        this.upgradesCount = {plume: 0, flower: 0, sands: 0, goblet: 0, circlet: 0};
    }

    prepare() {
        this.possibleStatSlots = {};
        for (let stat of Object.keys(this.rolls)) {
            this.possibleStatSlots[stat] = [];

            for (let slot of Object.keys(this.mainStats)) {
                if (this.mainStats[slot] != stat) {
                    this.possibleStatSlots[stat].push(slot);
                }
            }
        }
    }

    process() {
        this.lowCounters();

        // for (let stat of Object.keys(this.rolls)) {
        //     let rolls = this.rolls[stat].splice(0, 1);
        //     this.putIntoLowestCount(stat, rolls);

        //     if (this.rolls[stat].length == 0) {
        //         delete this.rolls[stat];
        //     }
        // }

        let byNumSlots = {};
        for (let stat of Object.keys(this.rolls)) {
            let avail = Object.values(this.mainStats).reduce((s, i) => {return s + (stat == i ? 0 : 1)}, 0);
            if (!byNumSlots[avail]) byNumSlots[avail] = [];
            byNumSlots[avail].push(stat);
        }

        for (let num of Object.keys(byNumSlots).sort((a, b) => {return a - b})) {
            let stats = byNumSlots[num];

            while (1) {
                if (stats.length == 0) break;

                for (let stat of stats) {
                    let rolls = this.rolls[stat].splice(0, 1);
                    this.putIntoLowestCount(stat, rolls);

                    if (this.rolls[stat].length == 0) {
                        delete this.rolls[stat];
                        stats.splice(stats.indexOf(stat), 1);
                    }
                }
            }
        }

        this.balanceUpgrades();
    }

    balanceUpgrades() {
        let count = Object.values(this.upgradesCount).reduce((s, i) => {return s + i}, 0);
        if (count <= MAX_UPGRADES_TOTAL) return;

        let isMoved = 1;
        let loop = 0;
        // try to move 1 upgrade to another piece without this stat
        while (isMoved) {
            if (++loop > MAX_REALLOCATE_LOOP) break;

            isMoved = 0;
            mainloop: for (let slot of Object.keys(this.mainStats)) {
                if (this.upgradesCount[slot] <= MAX_UPGRADES_PER_ARTIFACT) continue;

                for (let stat of Object.keys(this.result[slot])) {
                    if (this.result[slot][stat].length == 1) continue;

                    for (let possibleSlot of Object.keys(this.mainStats)) {
                        if (slot == possibleSlot) continue;
                        if (stat == this.mainStats[possibleSlot]) continue;
                        if (this.result[possibleSlot][stat]) continue;
                        if (Object.keys(this.result[possibleSlot]).length >= MAX_STATS_PER_ARTIFACT) continue;

                        let roll = this.result[slot][stat].pop();
                        this.result[possibleSlot][stat] = [roll];

                        --this.upgradesCount[slot];

                        isMoved = 1;
                        break mainloop;
                    }
                }
            }
        }

        loop = 0;
        isMoved = 1;
        // try to move 1 upgrade to another piece without this stat
        while (isMoved) {
            if (++loop > MAX_REALLOCATE_LOOP) break;

            isMoved = 0;
            mainloop: for (let slot of Object.keys(this.mainStats)) {
                if (this.upgradesCount[slot] <= MAX_UPGRADES_PER_ARTIFACT) continue;

                for (let stat of Object.keys(this.result[slot])) {
                    if (this.result[slot][stat].length == 1) continue;

                    for (let possibleSlot of Object.keys(this.mainStats)) {
                        if (slot == possibleSlot) continue;
                        if (stat == this.mainStats[possibleSlot]) continue;
                        if (!this.result[possibleSlot][stat]) continue;
                        if (this.upgradesCount[possibleSlot] >= MAX_UPGRADES_PER_ARTIFACT) continue;

                        let roll = this.result[slot][stat].pop();
                        this.result[possibleSlot][stat].push(roll);

                        --this.upgradesCount[slot];
                        ++this.upgradesCount[possibleSlot];

                        isMoved = 1;
                        break mainloop;
                    }
                }
            }
        }

        // try to reallocate upgrades
        // TODO
    }

    fillUselessStats(uselessStats, rollValues) {
        for (let [slot, mainStat] of Object.entries(this.mainStats)) {
            let list = shuffle([].concat(uselessStats)).filter((i) => {return i != mainStat});
            let used = [];

            while (Object.keys(this.result[slot]).length < MAX_STATS_PER_ARTIFACT) {
                let stat = list.pop();
                if (!stat) break;

                used.push(stat);

                // console.log(stat)
                this.putIntoSlot(slot, stat, rollValues[stat][0]);
            }

            if (used.length == 0) continue;

            while (this.upgradesCount[slot] < MAX_UPGRADES_PER_ARTIFACT) {
                for (let stat of used) {
                    this.putIntoSlot(slot, stat, rollValues[stat][0]);
                    // console.log(stat)
                    if (this.upgradesCount[slot] >= MAX_UPGRADES_PER_ARTIFACT) break;
                }
            }
        }
    }

    lowCounters() {
        for (let stat of Object.keys(this.rolls)) {
            if (this.rolls[stat].length > MAX_ROLLS_TO_PUT_LOWEST) continue;

            this.putIntoLowestDifferent(stat, this.rolls[stat]);
            delete this.rolls[stat];
        }
    }

    putIntoLowestCount(stat, rolls) {
        let list = [];
        for (let [slot, mainStat] of Object.entries(this.mainStats)) {
            if (stat == mainStat) continue;

            if (Object.keys(this.result[slot]).length >= MAX_STATS_PER_ARTIFACT) {
                if (!this.result[slot][stat]) continue;
            }

            if (this.result[slot][stat] && this.upgradesCount[slot] >= MAX_UPGRADES_PER_ARTIFACT) continue;

            list.push({
                slot: slot,
                // used: this.upgradesCount[slot] - Object.values(this.result[slot]).length / 10,
                used: this.upgradesCount[slot] + Object.values(this.result[slot]).length - (this.result[slot][stat] ? 0 : 2),
            });
        }

        if (list.length == 0) {
            for (let [slot, mainStat] of Object.entries(this.mainStats)) {
                if (stat == mainStat) continue;
                if (!this.result[slot][stat]) continue;

                list.push({
                    slot: slot,
                    used: this.upgradesCount[slot],
                });
            }
        }

        list = list.sort((a, b) => {return a.used - b.used});
        this.putIntoSlot(list[0].slot, stat, rolls);
    }

    putIntoLowestDifferent(stat, rolls) {
        let list = [];
        for (let [slot, mainStat] of Object.entries(this.mainStats)) {
            if (stat == mainStat) continue;

            if (Object.keys(this.result[slot]) >= MAX_STATS_PER_ARTIFACT) {
                if (!this.result[slot][stat]) continue;
            }

            list.push({
                slot: slot,
                used: Object.values(this.result[slot]).length,
            })
        }

        list = list.sort((a, b) => {return a.used - b.used});

        this.putIntoSlot(list[0].slot, stat, rolls);
    }

    putIntoSlot(slot, stat, rolls) {
        if (!this.result[slot][stat]) {
            if (Object.keys(this.result[slot]).length >= MAX_STATS_PER_ARTIFACT) {
                // console.log('invalid')
            }

            this.result[slot][stat] = [];
        }

        this.result[slot][stat] = this.result[slot][stat].concat(rolls);
        this.rollsCount[slot] += rolls.length;
        this.refreshUpgrages(slot);
    }

    refreshUpgrages(slot) {
        let count = 0;
        for (let [stat, rolls] of Object.entries(this.result[slot])) {
            count += rolls.length - 1;
        }
        this.upgradesCount[slot] = count;
    }
}

export function getMainStatCombinations(params) {
    let build = params.build.clone();
    let feature = params.build.getFeatureByName(params.feature);
    let buildData = build.getBuildData();
    let usedStats = feature.getUsedStats(buildData);

    let statsBySlot = {
        sands: [],
        goblet: [],
        circlet: [],
    };

    let useless = {
        sands: '',
        goblet: '',
        circlet: '',
    };

    if (params.settings.minRecharge > 100) {
        usedStats.push('recharge')
    }

    if (usedStats.includes('crit_value')) {
        usedStats.push('crit_rate')
        usedStats.push('crit_dmg')
    }

    for (let stat of DB.Artifacts.Mainstats.getKeys()) {
        let data = DB.Artifacts.Mainstats.get(stat);

        for (let slot of data.slots) {
            if (slot == 'flower' || slot == 'plume') continue;

            if (!usedStats.includes(stat)) {
                useless[slot] ||= stat;
                continue;
            }

            statsBySlot[slot].push(stat);
        }
    }

    for (let slot of Object.keys(statsBySlot)) {
        if (statsBySlot[slot].length == 0) {
            statsBySlot[slot].push(useless[slot]);
        }
    }

    let result = [];
    for (let s1 of statsBySlot.sands) {
        for (let s2 of statsBySlot.goblet) {
            for (let s3 of statsBySlot.circlet) {
                result.push({sands: s1, goblet: s2, circlet: s3});
            }
        }
    }

    return result;
}

function getStatRolls(mode) {
    let result = {};

    for (let stat of DB.Artifacts.Substats.getKeys()) {
        let rolls = DB.Artifacts.Substats.get(stat).rolls[4];

        if (mode == 'min') {
            result[stat] = [rolls[0]];
        } else if (mode == 'max') {
            result[stat] = [rolls[rolls.length - 1]];
        } else {
            result[stat] = [rolls[1], rolls[2]];
        }

        if (isPercent(stat)) {
            for (let i = 0; i < result[stat].length; ++i) {
                result[stat][i] = result[stat][i] / 100;
            }
        }
    }

    return result;
}

function getCombinationStatsFunc(combination) {
    let result = new Stats();
    for (let slot of Object.keys(combination)) {
        let stat = combination[slot];
        let data = DB.Artifacts.Mainstats.get(stat);
        let value = data.values[4].getValue(20);
        if (isPercent(stat)) {
            value = value / 100;
        }
        result.add(stat, value);
    }
    return result.getConcatFunc();
}

function shuffle(array) {
    let result = [].concat(array);
    let currentIndex = result.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
    }

    return result;
}
