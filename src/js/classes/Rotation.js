import { Condition } from "./Condition";
import { Serializer } from "./Serializer";
import { Stats } from "./Stats";

export const reactionFeatures = {
    1: 'reaction.melt',
    2: 'reaction.vaporize',
};

export const MAX_DEPTH = 3;

const ITEM_TYPE_FEATURE = 1;
const ITEM_TYPE_CONDITION = 2;
const ITEM_TYPE_REPEAT = 3;
const ITEM_TYPE_UPTIME = 4;

export class Rotation {
    constructor(data) {
        this.name = data && data.name || '';
        this.items = data && data.items || [];
    }

    addItem(item) {
        this.items.push(item);
    }

    getItems() {
        return this.items;
    }

    getfeaturesNames() {
        let result = getfeaturesRecursive(this.items);

        // for (const item of this.items) {
        //     if (item.type == 'feature') {
        //         result[item.feature] = 1;
        //     }

        //     for (let key of ['items', 'conditions', 'features']) {
        //         if (item.hasOwnProperty(key)) {
        //             for (let subItem of item[key]) {
        //                 if (subItem.type == 'feature') {
        //                     result[subItem.feature] = 1;
        //                 }
        //             }
        //         }
        //     }
        // }

        return Object.keys(result);
    }

    getItem(id) {
        return searchItemRecursive(id, this.items);
    }

    replaceItem(id, newItem) {
        let item = this.getItem(id);
        if (!item) return;

        for (let prop of Object.getOwnPropertyNames(item)) {
            if (prop == 'id') continue;

            delete item[prop];
        }

        for (let prop of Object.getOwnPropertyNames(newItem)) {
            item[prop] = newItem[prop];
        }
    }

    deleteItem(id) {
        let delItem = this.getItem(id);
        if (!delItem) return;

        deleteItemRecursive(delItem, this.items);
    }

    clone() {
        return Rotation.deserialize(this.serialize());
    }

    getHash() {
        return Serializer.pack(this);
    }

    serialize() {
        let result = serializeItems(this.getItems());
        result.unshift(0); // reserved for properties
        result.unshift(3); // version

        return result;
    }

    static deserialize(input) {
        let version = input.shift();
        let result = null;

        if (version == 1 || version == 2 || version == 3) {
            if (version >= 2) {
                input.shift(); // reserved for properties
            }
            let counter = 0;
            let items = deserializeItems(input, counter, version);
            result = new Rotation({items: items});
        }

        return result;
    }

    static getConditionData(item, set) {
        let result = {
            cond: null,
            typeId: 0,
            icon: '',
            object: '',
            dbObject: null,
            invalid: true,
        };

        let conditions = [];
        let validConditions = [];

        if (item.subtype == 'char') {
            let char = DB.Chars.getById(item.itemId);
            if (char) {
                result.typeId = 1;
                result.object = 'char';
                result.dbObject = char;
                result.icon   = 'sprite-char '+ char.getIcon();
                conditions    = char.getAllConditions();

                if (set && item.itemId == set.getChar().getId()) {
                    validConditions = conditions;
                }
            }
        } else if (item.subtype == 'weapon') {
            let weaponConditions = DB.Conditions.Weapon;
            conditions = conditions.concat(weaponConditions);

            let weapon = DB.Weapons.getById(item.itemId);
            if (weapon) {
                result.typeId = 2;
                result.object = 'weapon';
                result.icon   = 'sprite-weapon-'+ weapon.weapon +' '+ weapon.getIcon();
                conditions    = conditions.concat(weapon.getConditions());

                if (set && item.itemId == set.getWeapon().getId()) {
                    validConditions = conditions;
                }
            }
        } else if (item.subtype == 'artifacts') {
            let artifactSet = DB.Artifacts.Sets.getById(item.itemId);
            if (artifactSet) {
                result.typeId = 3;
                result.object = 'artifacts';
                result.icon   = 'sprite-artifact '+ artifactSet.getImage() +' flower';
                conditions    = artifactSet.getConditions(5);

                if (set) {
                    validConditions = set.getConditions({objects:[item.subtype]});
                }
            }
        } else if (item.subtype == 'enemy') {
            conditions = conditions.concat(DB.Conditions.Enemy);
            result.typeId = 4;
            result.object = 'enemy';

            if (item.itemId) {
                let enemy = DB.Enemies.getById(item.itemId);
                if (enemy) {
                    result.icon = 'sprite-enemy '+ enemy.getImage();
                    conditions = conditions.concat(enemy.getConditions());
                    validConditions = conditions;
                }
            }
        } else if (item.subtype == 'party') {
            let char = DB.Chars.getById(item.itemId);

            if (char) {
                result.typeId = 5;
                result.object = 'buffs';
                result.icon   = 'sprite-char '+ char.getIcon();
                conditions    = Condition.unwrap(char.getPartyConditions());

                if (set) {
                    let settings = set.getSettings();
                    for (let i = 1; i <= 3; ++i) {
                        if (settings['party_char_'+ i] == item.itemId) {
                            validConditions = conditions;
                        }
                    }
                }
            }
        } else if (item.subtype == 'buffs') {
            let items = [];
            let selected;

            for (const item of DB.Buffs.getList()) {
                items = items.concat(item.getConditions());
            }

            for (let cond of Condition.unwrap(items)) {
                if (cond.getId() == item.conditionId) {
                    selected = cond;
                    break;
                }
            }

            if (selected) {
                result.typeId = 6;
                result.object = 'buffs',
                result.icon   = selected.getIcon();
                conditions    = [selected];
                validConditions = conditions;
            }
        }

        for (const condItem of conditions) {
            if (condItem.getId() == item.conditionId) {
                result.cond = condItem;
                break;
            }
        }

        for (const condItem of validConditions) {
            if (condItem.getId() == item.conditionId) {
                result.invalid = false;
                break;
            }
        }

        return result;
    }

    static getArtSetByCondition(condId) {
        for (const set of DB.Artifacts.Sets.getList()) {
            for (const cond of set.getConditions(5)) {
                if (cond.getId() == condId) {
                    return set.getId();
                }
            }
        }

        return 0;
    }

    static getEnemyByCondition(condId) {
        for (const enemy of DB.Enemies.getList()) {
            for (const cond of enemy.getConditions()) {
                if (cond.getId() == condId) {
                    return enemy.getId();
                }
            }
        }

        return 0;
    }
}


function serializeItems(items) {
    let result = [];
    let count = 0;

    for (const item of items) {
        if (!item) continue;

        result.push(item.disabled ? 1 : 0);
        result.push(item.collapsed ? 1 : 0);

        if (item.type == 'feature') {
            let id = DB.Features.Rotation.getByName(item.feature);

            if (id) {
                ++count;
                result.push(ITEM_TYPE_FEATURE);
                result.push(id);
                result.push(Math.max(1, item.count));
                result.push(item.reaction || 0); // reaction
            }
        } else if (item.type == 'condition') {
            let data = Rotation.getConditionData(item);

            if (data.cond) {
                ++count;
                result.push(ITEM_TYPE_CONDITION);
                result.push(data.typeId);
                result.push(item.itemId);
                result.push(data.cond.params.serializeId);

                let value;
                if (data.cond.params.format == 'decimal') {
                    value = Math.floor(parseFloat(item.value) * 10);
                } else {
                    value = +item.value;
                }

                result.push(value || 0);
            }
        } else if (item.type == 'repeat') {
            ++count;
            result.push(ITEM_TYPE_REPEAT);
            result.push(Math.max(1, item.count));

            let subResult = serializeItems(item.items);
            result = result.concat(subResult);
        } else if (item.type == 'uptime') {
            ++count;
            result.push(ITEM_TYPE_UPTIME);
            result.push(1); // TODO type
            result.push(Math.min(100, Math.max(0, item.percent)));

            let subItems = [].concat(item.conditions, item.features);
            let subResult = serializeItems(subItems);
            result = result.concat(subResult);
        }
    }

    result.unshift(count);
    return result;
}

function deserializeItems(input, counter, version) {
    let count = input.shift();
    let result = [];

    for (let i = 0; i < count; ++i) {
        let item = {disabled: false};

        if (version >= 2) {
            item.disabled = !!input.shift();
        }

        if (version >= 3) {
            item.collapsed = !!input.shift();
        }

        let type = input.shift();
        item.id = ++counter;

        if (type == ITEM_TYPE_FEATURE) {
            item.type = 'feature';

            let featId = input.shift()
            item.feature = DB.Features.Rotation.getById(featId);

            if (!item.feature) return null;

            item.count = Math.max(1, input.shift());
            item.reaction = input.shift();
        } else if (type == ITEM_TYPE_CONDITION) {
            item.type = 'condition';
            let typeId = input.shift();

            if (typeId == 1) {
                item.subtype = 'char';
            } else if (typeId == 2) {
                item.subtype = 'weapon';
            } else if (typeId == 3) {
                item.subtype = 'artifacts';
            } else if (typeId == 4) {
                item.subtype = 'enemy';
            } else if (typeId == 5) {
                item.subtype = 'party';
            } else if (typeId == 6) {
                item.subtype = 'buffs';
            } else {
                return null;
            }

            item.itemId = input.shift();
            item.conditionId = input.shift();

            let data = Rotation.getConditionData(item);
            let value = input.shift();
            if (data && data.cond && data.cond.params.format == 'decimal') {
                value = Stats.format('text_decimal', value / 10, {no_decimal_zero: true});
            }
            item.value = value;
        } else if (type == ITEM_TYPE_REPEAT) {
            item.type = 'repeat';
            item.count = Math.max(1, input.shift());
            item.items = deserializeItems(input, counter, version);
            counter += item.items.length;
        } else if (type == ITEM_TYPE_UPTIME) {
            item.type = 'uptime';
            item.typeId = input.shift();
            item.percent = Math.min(100, Math.max(0, input.shift()));
            item.conditions = [];
            item.features = [];

            let subItems = deserializeItems(input, counter, version);
            counter += subItems.length;

            for (let subItem of subItems) {
                if (subItem.type == 'condition') {
                    item.conditions.push(subItem);
                } else {
                    item.features.push(subItem);
                }
            }
        } else {
            return null;
        }

        result.push(item);
    }

    return result;
}

function getfeaturesRecursive(items) {
    let result = {};

    for (const item of items) {
        if (item.type == 'feature') {
            result[item.feature] = 1;
        }

        for (let key of ['items', 'conditions', 'features']) {
            if (item.hasOwnProperty(key)) {
                let subResult = getfeaturesRecursive(item[key]);
                result = Object.assign(result, subResult);
            }
        }
    }
    return result;
}

function searchItemRecursive(id, items) {
    for (let item of items) {
        if (item.id == id) {
            return item;
        }


        for (let key of ['items', 'conditions', 'features']) {
            if (item.hasOwnProperty(key)) {
                let subResult = searchItemRecursive(id, item[key]);
                if (subResult) {
                    return subResult;
                }
            }
        }
    }

    return null;
}

function deleteItemRecursive(delItem, items) {
    let index = items.indexOf(delItem);
    if (index >= 0) {
        items.splice(index, 1);
        return 1;
    }

    for (let item of items) {
        for (let key of ['items', 'conditions', 'features']) {
            if (item.hasOwnProperty(key)) {
                let deleted = deleteItemRecursive(delItem, item[key]);
                if (deleted) return 1;
            }
        }
    }

    return 0;
}
