import { Serializer } from './Serializer';
import { Stats } from './Stats';
import { substatCheck } from './SubstatCheck';

export class Artifact {
    constructor(rarity, level, slot, set, mainStat, subStats) {
        this.rarity = rarity;
        this.level = level;
        this.slot = slot;
        this.set = set;
        this.mainStat = mainStat;
        this.subStats = subStats || [];
        this.locked = false;
        this.groups = [];
        this.calculated = null;
    }

    addStat(stat, value) {
        this.subStats.push({
            stat: stat,
            value: value,
        });

        this.calculated = null;
    }

    calcStats() {
        var result = new Stats();

        let mainData = DB.Artifacts.Mainstats.get(this.mainStat);
        if (mainData) {
            let statTable = mainData.values[this.rarity - 1];
            result.add(this.mainStat, statTable.getValue(this.level));
        }

        for (let i = 0; i < this.subStats.length; ++i) {
            let item = this.subStats[i];
            let substatData = DB.Artifacts.Substats.get(item.stat);

            result.add(item.stat, substatData.getPreciseValue(item.value, this.rarity));
        }

        result.add('crit_value', result.get('crit_rate') * 2 + result.get('crit_dmg'));

        return result;
    }

    calcCache(usedStats) {
        this.calculated = this.calcStats();
        this.calculated.truncate(usedStats);
        this.calculated.processPercent();
    }

    replace(art) {
        this.rarity = art.rarity;
        this.level = art.level;
        this.slot = art.slot;
        this.set = art.set;
        this.mainStat = art.mainStat;
        this.subStats = art.subStats;
        this.groups = art.getGroups();

        this.calculated = null;
    }

    getLevel() {
        return this.level;
    }

    getSet() {
        return this.set;
    }

    getRarity() {
        return this.rarity;
    }

    getMainStat() {
        return ''+ this.mainStat;
    }

    getSetName() {
        return ''+ this.set;
    }

    getSlot() {
        return ''+ this.slot;
    }

    getMainStatValue() {
        let stat = this.getMainStat();
        if (!stat) {
            return 0;
        }

        let data = DB.Artifacts.Mainstats.get(stat);

        return data.values[this.rarity-1].getValue(this.level);
    }

    getSubStats() {
        return this.subStats;
    }

    setGroups(value) {
        let names = value;
        if (!Array.isArray(value)) {
            names = [value];
        }

        let result = [];
        for (let name of names) {
            let newName = Artifact.trimGroupName(name);
            if (!Artifact.inGroups(result, newName)) {
                result.push(newName);
            }
        }

        this.groups = result;
    }

    getGroups() {
        if (!this.groups || this.groups.length == 0) {
            return [''];
        }
        return this.groups;
    }

    hasGroup(group) {
        let id = group.toUpperCase();
        for (let group of this.groups) {
            if (id == group.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    inGroups(groupList) {
        for (let groupName of groupList) {
            if (this.hasGroup(groupName)) {
                return true;
            }
        }
        return false;
    }

    isValid() {
        return this.getErrors().length == 0;
    }

    setLocked(val) {
        this.locked = !!val;
    }

    isLocked() {
        return this.locked;
    }

    getHash() {
        return Serializer.pack(this);
    }

    getErrors() {
        let errors = [];

        if (! DB.Artifacts.Sets.get(this.set)) {
            errors.push('no_set');
        }

        if (! DB.Artifacts.Mainstats.get(this.mainStat)) {
            errors.push('no_main_stat');
        }

        let rarityData = DB.Artifacts.Rarity[this.rarity-1];

        let statsCnt = this.subStats.length;
        if (statsCnt < rarityData.minSubstats || statsCnt > rarityData.maxSubstats) {
            errors.push('substat_count_mismatch');
        }

        let isStatEqulaMain = false;
        let isSubstatValueRange = false;
        let isSubstatValueRolls = false;
        let isSubstatDuplicate = false;

        let allSubstats = [];
        let upgradesCnt = 0;

        for (const sub of this.subStats) {
            if (sub.stat == this.mainStat) {
                isStatEqulaMain = true;
            }

            if (allSubstats.includes(sub.stat)) {
                isSubstatDuplicate = true;
            }
            allSubstats.push(sub.stat);

            let rollData = substatCheck(sub.stat, this.rarity, sub.value);

            if (rollData.last > 0) {
                if (rollData.steps.length < rollData.maxUpgrades) {
                    isSubstatValueRolls = true;
                } else {
                    isSubstatValueRange = true;
                }
            }

            if (rollData.steps.length > 1) {
                upgradesCnt += rollData.steps.length - 1;
            }
        }

        let maxRarityUpdates = rarityData.maxSubstats - 4 + Math.floor(this.level / 4);
        let minRarityUpdates = Math.max(0, rarityData.minSubstats - 4 + Math.floor(this.level / 4));

        if (upgradesCnt > 0 && this.subStats.length < 4) {
            errors.push('not_full_substats');
        }

        if (upgradesCnt > maxRarityUpdates || upgradesCnt >= rarityData.maxUpgrades) {
            errors.push('too_much_upgrades');
        }

        if (upgradesCnt < minRarityUpdates - 1) {
            errors.push('too_low_upgrades');
        }

        if (isStatEqulaMain) {
            errors.push('substat_equal_main');
        }

        if (isSubstatValueRolls) {
            errors.push('substat_value_rolls');
        }

        if (isSubstatValueRange) {
            errors.push('substat_value_range');
        }

        if (isSubstatDuplicate) {
            errors.push('substat_duplicate');
        }

        return errors;
    }

    getErrorsFormatted() {
        let errors = this.getErrors();

        if (errors.length == 0) return '';

        let result = '';

        for (const text of errors) {
            result += '<p>'+ UI.Lang.get('artifact_error.'+ text) +'</p>';
        }

        return result;
    }

    toGood() {
        let setData = DB.Artifacts.Sets.get(this.set);
        let statData = DB.Artifacts.Mainstats.get(this.mainStat);

        let result = {
            setKey: setData.getGoodId(),
            slotKey: this.slot,
            level: this.level,
            rarity: this.rarity,
            mainStatKey: statData.goodId,
            location: "",
            lock: false,
            substats: [],
        };

        for (const item of this.subStats) {
            let data = DB.Artifacts.Substats.get(item.stat);
            if (!data) {
                return null;
            }

            result.substats.push({
                key: data.goodId,
                value: item.value,
            });
        }

        return result;
    }

    serialize() {
        let result = [1];

        result.push(DB.Artifacts.Sets.getId(this.set));
        result.push(this.rarity);
        result.push(this.level);
        result.push(DB.Artifacts.Slots.getId(this.slot));
        result.push(DB.Artifacts.Mainstats.getId(this.mainStat) || 0);
        result.push(this.subStats.length);

        for (const stat of this.subStats) {
            result.push(DB.Artifacts.Substats.getId(stat.stat));

            let substat = DB.Artifacts.Substats.get(stat.stat);
            let value = stat.value;

            if (substat.type == 'percent') {
                value = Math.floor(value * 10);
            }

            result.push(value);
        }

        return result;
    }

    clone() {
        return Artifact.deserialize(this.serialize());
    }

    static deserialize(input) {
        let version = input.shift();
        let result = null;

        if (version == 1) {
            let set = DB.Artifacts.Sets.getKeyId(input.shift());
            if (!set) return null;

            let rarity = input.shift();
            if (rarity < 1 || rarity > 5) return null;

            let level = input.shift();
            if (level < 0 || level > 20) return null;

            let slot = DB.Artifacts.Slots.getKeyId(input.shift());
            if (!slot) return null;

            let mainStat = DB.Artifacts.Mainstats.getKeyId(input.shift()) || '';
            // if (!mainStat) return null;

            let substatCnt = input.shift();
            if (substatCnt < 0 || substatCnt > 4) return null;

            result = new Artifact(rarity, level, slot, set, mainStat);

            for (let i = 1; i <= substatCnt; ++i) {
                let statKey = DB.Artifacts.Substats.getKeyId(input.shift());
                if (!statKey) return null;

                let value = input.shift();
                if (value < 1) return null;

                let substat = DB.Artifacts.Substats.get(statKey);
                if (!substat) return null;

                if (substat.type == 'percent') {
                    value = parseFloat(value) / 10;
                } else {
                    value = parseInt(value)
                }

                result.addStat(statKey, value);
            }
        }

        return result;
    }

    static fromGood(data) {
        let setName = DB.Artifacts.Sets.getKeyIdGood(data.setKey);
        let setData = DB.Artifacts.Sets.get(setName);
        if (!setData) return null;

        let slotData = DB.Artifacts.Slots.get(data.slotKey);
        if (!slotData) return null;

        let mainStat = DB.Artifacts.Mainstats.getKeyIdGood(data.mainStatKey);
        let mainData = DB.Artifacts.Mainstats.get(mainStat);
        if (!mainData) return null;

        if (!mainData.slots.includes(data.slotKey)) return null;

        if (data.rarity < setData.minRarity && data.rarity > setData.maxRarity) return null;

        let rarityData = DB.Artifacts.Rarity[data.rarity - 1];
        if (data.level < 0 && data.level > rarityData.maxLevel) return null;

        let result = new Artifact(data.rarity, data.level, data.slotKey, setName, mainStat);

        if (Array.isArray(data.substats)) {
            if (data.substats.length > 4) return null;

            for (const item of data.substats) {
                if (!item.key) {
                    continue;
                }
                let subStat = DB.Artifacts.Substats.getKeyIdGood(item.key);
                if (!subStat) return null;

                let value = item.value;
                result.addStat(subStat, value);
            }
        }

        return result;
    }

    static subStatsIsSimilar(sample, art) {
        if (sample.subStats.length < art.subStats.length) {
            return false;
        }

        for (let i = 0; i < art.subStats.length; ++i) {
            if (sample.subStats[i].stat != art.subStats[i].stat || sample.subStats[i].value < art.subStats[i].value) {
                return false;
            }
        }

        return true;
    }

    static inGroups(groups, name) {
        for (let group of groups) {
            if (Artifact.groupsAreEqual(group, name)) {
                return true;
            }
        }
        return false;
    }

    static groupsAreEqual(g1, g2) {
        return g1.toUpperCase() == g2.toUpperCase();
    }

    static trimGroupNames(values) {
        if (!Array.isArray(values)) {
            values = [values]
        }

        let result = [];
        for (let value of values) {
            result.push(Artifact.trimGroupName(value));
        }
        return result;
    }

    static trimGroupName(value) {
        let group = value || '';
        group = group.replace(/[^\w\u0400-\u04ff\d_\-\s]/g, '')
        group = group.replace(/\s+/g, ' ')
        return group.trim();
    }

    static settingName(name) {
        return 'set_pieces.'+ name.toLowerCase();
    }

    static settingNameShort(name) {
        return name.toLowerCase();
    }
}



