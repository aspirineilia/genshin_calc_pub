import { CalcSet } from "./CalcSet";
import { Rotation } from "./Rotation";
import { Serializer } from "./Serializer";
import { StorageItemArtifacts } from "./StorageItem/Artifacts";

export class Backup {
    constructor(data) {
        this.data = data;
    }

    setLastModified(lastModified) {
        this.data.lastModified = lastModified;
    }

    getLastModified() {
        return this.data.lastModified || 0;
    }

    getChars() {
        return this.data.chars || [];
    }

    getArtifacts() {
        return this.data.artifacts || [];
    }

    getRotations() {
        return this.data.rotations || [];
    }

    stringify() {
        return JSON.stringify(this.data);
    }

    toBlob() {
        return new Blob([this.stringify()], {type: "application/json;charset=utf-8"});
    }

    static fromStorage(storage, opts) {
        if (!opts) {
            opts = {
                saveChars: 1,
                saveArts: 1,
                saveRotations: 1,
            };
        }

        let data = {
            version: 1,
        };

        if (opts.saveChars) {
            let items = storage.char.list();
            data.chars = [];

            for (let i in items) {
                let item = items[i];
                let set = storage.char.decodeItem(item.data);

                if (set) {
                    data.chars.push(item)
                }
            }
        }

        if (opts.saveArts) {
            let items = storage.artifacts.list();

            data.artifacts = [];
            for (let item of items) {
                data.artifacts.push(item);
            }
        }

        if (opts.saveRotations) {
            let items = storage.rotation.list();

            data.rotations = [];
            for (let i in items) {
                let item = items[i];
                let set = storage.rotation.decodeItem(item.data);

                if (set) {
                    data.rotations.push(item)
                }
            }
        }

        return new Backup(data);
    }

    static fromString(string) {
        let data;

        try {
            data = JSON.parse(string);
        } catch(e) {
            return null;
        }

        if (typeof data !== 'object') {
            return null;
        }

        let result = {};

        if (data.version == 1) {
            result.version = 1;
            result.lastModified = parseInt(data.lastModified)

            if (data.chars && Array.isArray(data.chars)) {
                let chars = [];

                for (const item of data.chars) {
                    if (typeof item !== 'object') {
                        return null;
                    }

                    let set = CalcSet.deserialize( Serializer.unpack(item.data) );
                    if (set) {
                        chars.push({
                            title: '' + (item.title || ''),
                            data: item.data,
                        });
                    }
                }

                if (chars.length) {
                    result.chars = chars;
                }
            }

            if (data.artifacts && Array.isArray(data.artifacts)) {
                let artifacts = [];

                for (const item of data.artifacts) {
                    if (typeof item !== 'object') {
                        return null;
                    }

                    let validItem = StorageItemArtifacts.getValidData(item);
                    if (validItem) {
                        artifacts.push(validItem);
                    }
                }

                if (artifacts.length) {
                    result.artifacts = artifacts;
                }
            }

            if (data.rotations && Array.isArray(data.rotations)) {
                let rotations = [];

                for (const item of data.rotations) {
                    if (typeof item !== 'object') {
                        return null;
                    }

                    let rotation = Rotation.deserialize( Serializer.unpack(item.data) );
                    if (rotation) {
                        rotations.push({
                            title: ''+ (item.title || ''),
                            icon: item.icon,
                            data: item.data,
                        });
                    }
                }

                if (rotations.length) {
                    result.rotations = rotations;
                }
            }
        } else {
            return null;
        }

        return new Backup(result);
    }
}
