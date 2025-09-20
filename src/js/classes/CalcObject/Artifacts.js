import { Artifact } from '../Artifact';
import { CalcObject } from '../CalcObject';
import { Stats } from '../Stats';

const slots = ['flower', 'plume', 'sands', 'goblet', 'circlet'];

export class CalcObjectArtifacts extends CalcObject {
    constructor() {
        super();
        this.artifacts = {
            flower: null,
            plume: null,
            sands: null,
            goblet: null,
            circlet: null,
        };
    }

    get() {
        return this.artifacts;
    }

    hasEquipped() {
        for (let slot of slots) {
            if (this.artifacts[slot]) {
                return true;
            }
        }

        return false;
    }

    getSettings() {
        let settings = Object.assign({}, this.settings);
        let setCounter = {};

        for (let slot of slots) {
            let art = this.artifacts[slot]
            if (art) {
                setCounter[art.set] = 1 + (setCounter[art.set] || 0);
            }
        }

        for (let setName of Object.keys(setCounter)) {
            settings[Artifact.settingName(setName)] = setCounter[setName];
        }

        return settings
    }

    getFeatures() {
        let result = [];

        let sets = this.activeSets();
        let setIds = Object.keys(sets);

        for (let i = 0; i < setIds.length; ++i) {
            let set = setIds[i];
            let setData = DB.Artifacts.Sets.get(set);

            if (setData) {
                let features = setData.getFeatures(sets[set]);
                result = result.concat(features);
            }
        }

        return result;
    }

    isBeta() {
        let sets = this.activeSets();
        let setIds = Object.keys(sets);

        for (let set of setIds) {
            let setData = DB.Artifacts.Sets.get(set);
            if (setData && setData.isBeta()) {
                return true;
            }
        }

        return false;
    }

    getStats(settings) {
        let result = {
            stats: new Stats(),
            settings: {},
        };

        for (let i = 0; i < slots.length; ++i) {
            const slot = slots[i];
            let art = this.artifacts[slot];
            if (art) {
                result.stats.concat(art.calcStats(settings));
            }
        }

        return result;
    }

    getConditions() {
        let result = [];
        let sets = this.activeSets();
        let setIds = Object.keys(sets);

        for (let i = 0; i < setIds.length; ++i) {
            let set = setIds[i];

            let setData = DB.Artifacts.Sets.get(set);
            if (setData) {
                let items = setData.getConditions(sets[set]);
                result = result.concat(items);
            }
        }

        return result;
    }

    getPostEffects() {
        let result = [];

        for (let setData of DB.Artifacts.Sets.getList()) {
            let items = setData.getPostEffects();
            result = result.concat(items);
        }

        return result;
    }

    getMultipliers() {
        let result = [];
        let sets = this.activeSets();

        for (const [set, pieces] of Object.entries(sets)) {
            let setData = DB.Artifacts.Sets.get(set);
            if (setData) {
                let items = setData.getMultipliers(pieces);
                result = result.concat(items);
            }
        }

        return result;
    }

    modifySets(sets) {
        let data = [].concat(sets);
        let usedSet = {};
        let setNames = DB.Artifacts.Sets.getKeys();

        for (let i = 0; i < slots.length; ++i) {
            const slot = slots[i];
            let curArt = this.artifacts[slot];

            if (curArt) {
                let name = data.shift();


                if (!name) {
                    for (const setName of setNames) {
                        if (usedSet[setName]) {
                            continue;
                        }

                        let setData = DB.Artifacts.Sets.get(setName);
                        let cond = setData.getConditions(1);

                        if (cond.length) {
                            continue;
                        }

                        if (setData.minRarity <= curArt.rarity && setData.maxRarity >= curArt.rarity) {
                            name = setName;
                        }
                    }
                }

                usedSet[name] = 1;
                curArt.set = name;
            }
        }
    }

    set(art) {
        let slot = art.slot;
        this.artifacts[slot] = art;

        this.removeInvalidSettings();
    }

    replace(items) {
        for (let art of items) {
            let slot = art.slot;
            this.artifacts[slot] = art;
        }

        this.removeInvalidSettings();
    }

    remove(art) {
        let hash = art.getHash();
        for (let i = 0; i < slots.length; ++i) {
            const slot = slots[i];
            let art = this.artifacts[slot];
            if (art && art.getHash() == hash) {
                this.artifacts[slot] = null;
                this.removeInvalidSettings();
            }
        }
    }

    clearArtifacts() {
        for (let i = 0; i < slots.length; ++i) {
            const slot = slots[i];
            this.artifacts[slot] = null;
        }
    }

    isEquipped(art) {
        let slot = art.slot;

        if (this.artifacts[slot] && this.artifacts[slot] == art) {
            return true;
        }

        return false;
    }

    activeSets() {
        let activeSets = {};

        for (let i = 0; i < slots.length; ++i) {
            const slot = slots[i];

            let art = this.artifacts[slot];
            if (!art) {
                continue;
            }

            if (!art.set) {
                continue;
            }

            if (!activeSets[art.set]) {
                activeSets[art.set] = 0;
            }

            ++activeSets[art.set];
        }

        return activeSets;
    }

    serialize(settings) {
        let result = [];
        let count = 0;

        for (let i = 0; i < slots.length; ++i) {
            const slot = slots[i];

            let art = this.artifacts[slot];
            if (!art) {
                continue;
            }

            ++count;

            result = result.concat(art.serialize());
        }

        result.unshift(count);

        let condData = this.serializeConditions(settings);
        return result.concat(condData);
    }

    static deserialize(input) {
        let count = input.shift();
        if (count < 0 || count > 5) return null;

        let result = new CalcObjectArtifacts();

        for (let i = 1; i <= count; ++i) {
            let art = Artifact.deserialize(input);
            if (art) {
                result.set(art);
            } else {
                return null;
            }
        }

        let settings = result.deserializeConditions(input);
        if (!settings) return null

        result.setSettings(settings);

        return result;
    }
}
