import { ArtifactGenerator, StatDistributor, StatsObject } from "./Artifacts";

const ALL_SUBSTATS_ROLLS = 2;
const MAX_STATS_PER_ARTIFACT = 4;
const MAX_ROLLS = 40;
const MAX_UNIQ_UPGRADES_PER_ARTIFACT = 1;
const MAX_UPGRADES_PER_ARTIFACT = 5;

export class ArtifactGeneratorKQM extends ArtifactGenerator {
    makeTestObject(combination, stats) {
        let testObj = new StatsObjectKQM(combination, this.usefulStats, this.usefulStats, this.statRolls, this.settings);

        for (let stat of DB.Artifacts.Substats.getKeys()) {
            for (let i = 1; i <= ALL_SUBSTATS_ROLLS; ++i) {
                let rollValue = testObj.addRoll(stat);
                stats.add(stat, rollValue);
            }
        }

        if (!testObj.satisfyStat('recharge', this.minRecharge, stats) ) {
            return;
        }

        return testObj;
    }

    makeObject(combination, stats) {
        let obj = new StatsObjectKQM(combination, this.usefulStats, this.uselessStats, this.statRolls, this.settings);

        for (let stat of DB.Artifacts.Substats.getKeys()) {
            for (let i = 1; i <= ALL_SUBSTATS_ROLLS; ++i) {
                let rollValue = obj.addRoll(stat);
                stats.add(stat, rollValue);
            }
        }

        return obj;
    }
}

export class StatsObjectKQM extends StatsObject {
    constructor(combination, usefulStats, uselessStats, statValues, settings) {
        settings = Object.assign({}, settings);
        settings.count = 40;
        settings.critRolls = 40;

        super(combination, usefulStats, uselessStats, statValues, settings);
    }

    getStatMaxAllowed(stat) {
        let maxByStat = MAX_ROLLS;
        let maxByMainStat = 2 + (5 - this.getMainStatsCnt(stat)) * (1 + MAX_UNIQ_UPGRADES_PER_ARTIFACT);

        return Math.min(maxByStat, maxByMainStat);
    }

    getStatRollsAllowed(stat) {
        let used = this.rolls[stat] ? this.rolls[stat].length : 0;
        return this.getStatMaxAllowed(stat) - used;
    }

    getDistibutor() {
        return new StatDistributorKQM(this.mainStats, this.rolls);
    }
}

export class StatDistributorKQM extends StatDistributor {
    fillUselessStats() {}

    process() {
        for (let stat of Object.keys(this.rolls)) {
            let rolls = this.rolls[stat].splice(0, 1);
            this.putIntoLowestCount(stat, rolls);

            if (this.rolls[stat].length == 0) {
                delete this.rolls[stat];
            }
        }

        let byNumSlots = {};
        for (let stat of Object.keys(this.rolls)) {
            let avail = Object.values(this.mainStats).reduce((s, i) => {return s + (stat == i ? 0 : 1)}, 0);
            if (!byNumSlots[avail]) byNumSlots[avail] = [];
            byNumSlots[avail].push(stat);
        }

        let byCount = {};
        for (let stat of Object.keys(this.rolls)) {
            byCount[stat] = this.rolls[stat].length;
        }

        for (let stat of Object.keys(byCount).sort((a, b) => {return byCount[b] - byCount[a]})) {
            while (this.rolls[stat] && this.rolls[stat].length > 0) {
                let rolls = this.rolls[stat].splice(0, 1);
                this.putIntoLowestCount(stat, rolls);

                if (this.rolls[stat].length == 0) {
                    delete this.rolls[stat];
                }
            }
        }
    }
}
