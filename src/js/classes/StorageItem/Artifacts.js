import { Artifact } from "../Artifact";
import { Serializer } from "../Serializer";
import { StorageItem } from "../StorageItem";

export class StorageItemArtifacts extends StorageItem {
    constructor() {
        super('artifact_pool');
        this.resetCache();
    }

    decodeItem(string) {
        let input = Serializer.unpack(string);
        if (!input) return null;

        return Artifact.deserialize(input);
    }

    fromPool(pool) {
        this.items = [];
        this.error = false;

        for (let art of pool.items) {
            this.items.push({
                data: Serializer.pack(art),
                locked: art.isLocked(),
                group: art.getGroups(),
            });
        }

        this.save();
    }

    validateItem(item) {
        let art = this.decodeItem(item.data);
        if (!art) return null;

        return StorageItemArtifacts.getValidData(item);
    }

    parseString(string) {
        if (string.substring(0,1) == '[') {
            return super.parseString(string)
        }

        let items = string.split(';');
        let result = [];

        for (let item of items) {
            result.push({
                data: item,
                locked: 0,
                group: '',
            })
        }

        return result;
    }

    storageHashes() {
        let hashes = {};

        for (let item of this.listDecoded(1)) {
            hashes[item.data.getHash()] = 1;
        }

        return hashes;
    }

    listGroups() {
        this.requireCache();
        return this.groupsCache;
    }

    listArtifacts() {
        this.requireCache();
        return this.artifactsCache;
    }

    save() {
        super.save();
        this.resetCache();
    }

    reload() {
        super.reload();
        this.resetCache()
    }

    getByHash(hash) {
        this.requireCache();
        let index = this.indexByHash[hash];
        return this.artifactsCache[index];
    }

    getItemByHash(hash) {
        this.requireCache();
        let index = this.indexByHash[hash];
        return this.items[index];
    }

    getArtByIndex(index) {
        this.requireCache();
        return this.artifactsCache[index];
    }

    addArtifacts(items, replace) {
        this.requireCache();

        let newArts = [];

        for (let art of items) {
            let hash = art.getHash();
            if (!replace && this.indexByHash[hash]) {
                continue;
            }

            newArts.push({
                data: hash,
                locked: art.isLocked(),
                group: art.getGroups(),
            });
        }

        if (newArts.length) {
            if (replace) {
                this.items = newArts;
            } else {
                this.items = this.items.concat(newArts)
            }
            this.save();
        }
    }

    updateByHash(hash, art) {
        let item = this.getItemByHash(hash);
        if (item) {
            item.data = Serializer.pack(art);
            item.locked = art.isLocked();
            item.group = art.getGroups();
            this.save();
        }
    }

    updateGroup(oldName, newName) {
        for (let item of this.items) {
            let newGroups = [];
            for (let group of item.group) {
                if (Artifact.groupsAreEqual(group, oldName)) {
                    newGroups.push(newName);
                } else {
                    newGroups.push(group);
                }
            }

            item.group = newGroups;
        }
        this.save();
    }

    deleteByHash(hash) {
        this.requireCache();
        this.remove(this.indexByHash[hash]);
    }

    getLocked() {
        let arts = [];
        for (let item of this.items) {
            if (item.locked) {
                arts.push(item.data);
            }
        }
        return arts;
    }

    requireCache() {
        if (this.artifactsCache === null) {
            this.refreshCache();
        }
    }

    resetCache() {
        this.artifactsCache = null;
        this.groupsCache = null;
        this.indexByHash = null;
    }

    refreshCache() {
        this.artifactsCache = [];
        this.groupsCache = [];
        this.indexByHash = {};

        let groups_hash = {};
        let groups_counter = {'': 0};

        for (let index in this.items) {
            let item = this.items[index];

            this.indexByHash[item.data] = index;

            for (let group of item.group) {
                if (group) {
                    let lcname = group.toUpperCase()
                    groups_hash[lcname] = group;

                    if (!groups_counter[lcname]) {
                        groups_counter[lcname] = 0
                    }
                    ++groups_counter[lcname];
                } else {
                    ++groups_counter[''];
                }
            }

            let art = this.decodeItem(item.data);
            art.setLocked(item.locked);
            art.setGroups(item.group);
            this.artifactsCache.push(art);
        }

        this.groupsCache = [{
            value: '',
            title: UI.Lang.get('artifact_group.empty_group'),
            count: groups_counter[''],
        }];

        for (let key of Object.keys(groups_hash).sort()) {
            this.groupsCache.push({
                value: groups_hash[key],
                title: groups_hash[key],
                count: groups_counter[key],
            });
        }
    }

    getSimilar(sample) {
        let result = [];

        if (!sample || !sample.set || !sample.mainStat) {
            return [];
        }

        for (let i in this.artifactsCache) {
            const art = this.artifactsCache[i];

            if (sample.set != art.set || sample.mainStat != art.mainStat || sample.rarity != art.rarity || sample.level < art.level) {
                continue;
            }

            if (!Artifact.subStatsIsSimilar(sample, art)) {
                continue;
            }

            result.push({
                art: art,
                index: i,
            });
        }

        return result;
    }

    setLocked(artifacts, value) {
        let hashes = {};
        for (let art of artifacts) {
            hashes[art] = 1;
        }

        for (let item of this.items) {
            if (hashes[item.data]) {
                item.locked = !!value;
            }
        }

        this.save();
    }

    lockAll() {
        for (let item of this.items) {
            item.locked = 1;
        }
        this.save();
    }

    unlockAll() {
        for (let item of this.items) {
            item.locked = 0;
        }
        this.save();
    }

    static getValidData(item) {
        return {
            data: item.data,
            locked: !!item.locked,
            group: Artifact.trimGroupNames(item.group),
        };
    }
}
