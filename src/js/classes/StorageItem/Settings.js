import { StorageItem } from "../StorageItem";

export class StorageItemSettings extends StorageItem {
    constructor() {
        super('settings');
    }

    remove(name) {
        delete this.items[name];
        this.save();
    }

    get(name) {
        let result = this.items[name];
        if (result === undefined) {
            result = this.getDefaultValue(name);
        }
        return result;
    }

    showBetaContent() {
        return !!this.get('show_beta_content');
    }

    getDefaultValue(name) {
        if (name.match(/_arr$/)) {
            return [];
        }
        return '';
    }

    set(name, value) {
        let validItem = this.validateItem(name, value);
        if (validItem) {
            this.items = Object.assign(this.items, validItem)
            this.save();
        }
    }

    reload() {
        let string = this.getString();
        this.items = {};

        if (string) {
            let json = this.parseString(string);
            if (!json) {
                return;
            }

            if (typeof json === 'object' && !Array.isArray(json) && json !== null) {
                for (let name of Object.keys(json)) {
                    let validItem = this.validateItem(name, json[name]);
                    if (validItem) {
                        Object.assign(this.items, validItem)
                    }
                }
            }
        }
    }

    validateItem(name, value) {
        let result = {};

        if (name.match(/_arr$/)) {
            if (Array.isArray(value)) {
                let validValues = [];
                for (let item of value) {
                    if (typeof item == 'string' || typeof item == 'number') {
                        validValues.push(item);
                    }
                }
                result[name] = validValues;
            } else {
                return;
            }
        } else if (typeof value == 'string' || typeof value == 'number') {
            result[name] = value;
        } else {
            return;
        }

        return result;
    }
}
