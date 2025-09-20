import { Rotation } from "../Rotation";
import { Serializer } from "../Serializer";
import { StorageItem } from "../StorageItem";

export class StorageItemRotation extends StorageItem {
    constructor() {
        super('rotation');
        this.resetCache();
    }

    decodeItem(string) {
        let input = Serializer.unpack(string);
        if (!input) return null;

        return Rotation.deserialize(input);
    }

    itemHash(item) {
        return item.data +'-'+ (item.title || '');
    }

    setIcon(index, charId) {
        if (this.error) return null;

        if (this.items[index]) {
            this.items[index].icon = charId;
            this.save();
        }
    }

    getByHash(hash) {
        this.requireCache();
        let index = this.indexByHash[hash];
        return this.itemsCache[index];
    }

    getItemByHash(hash) {
        this.requireCache();
        let index = this.indexByHash[hash];
        return this.items[index];
    }

    getByIndex(index) {
        this.requireCache();
        return this.itemsCache[index];
    }

    deleteByHash(hash) {
        this.requireCache();
        this.remove(this.indexByHash[hash]);
    }

    updateByHash(hash, rotation) {
        this.requireCache();
        let item = this.getItemByHash(hash);
        if (item) {
            item.data = Serializer.pack(rotation);
            this.save();
        }
    }

    updateTitleByHash(hash, title) {
        this.requireCache();
        let item = this.getItemByHash(hash);
        if (item) {
            item.title = title;
            this.save();
        }
    }

    updateIconByHash(hash, icon) {
        this.requireCache();
        let item = this.getItemByHash(hash);
        if (item) {
            item.icon = icon;
            this.save();
        }
    }

    requireCache() {
        if (this.itemsCache === null) {
            this.refreshCache();
        }
    }

    save() {
        super.save();
        this.resetCache();
    }

    reload() {
        super.reload();
        this.resetCache()
    }

    resetCache() {
        this.itemsCache = null;
        this.indexByHash = null;
    }

    refreshCache() {
        this.itemsCache = [];
        this.indexByHash = {};

        for (let index in this.items) {
            let item = this.items[index];

            this.indexByHash[item.data] = index;

            let rotation = this.decodeItem(item.data);

            this.itemsCache.push({
                icon: item.icon,
                title: item.title,
                item: rotation,
                hash: item.data,
            });
        }

    }
}
