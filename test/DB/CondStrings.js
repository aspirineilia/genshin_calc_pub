import { MAX_SET_SIZE } from "../../src/js/classes/ArtifactSet";
import { DB } from "../../src/js/db/DB";
import { toBeEmptyArray } from "../../src/js/test/matchers";
import { Lang } from "../../src/js/ui/Lang";

global.window = {};
global.localStorage = {};

require('../../src/js/lang/eng.js')

let lang = new Lang();

let list = [
    {name: 'Chars cond',    object: DB.Chars,               type: 'charcond'},
    {name: 'Chars party',   object: DB.Chars,               type: 'charparty'},
    {name: 'Artifact cond', object: DB.Artifacts.Sets,      type: 'artset'},
    {name: 'Weapons',       object: DB.Weapons,             type: 'tree'},
];

expect.extend({toBeEmptyArray});

for (const data of list) {
    let items = getItems(data);

    test('Empty ids for '+ data.name, () => {
        expect(Object.keys(items)).toBeEmptyArray();
    });
}

function getItems(data) {
    let result = {};

    if (data.type == 'tree') {
        for (const block of data.object.getKeys()) {
            let blockObject = data.object.get(block);

            for (const item of blockObject.getList(1)) {
                for (const cond of item.getConditions()) {
                    for (let str of [cond.params.title, cond.params.description]) {
                        if (!str) continue;

                        let lang_str = lang.get(str);
                        if (lang_str == str) {
                            result[str] = 1;
                        }
                    }
                }
            }
        }
    } else if (data.type == 'artset') {
        for (const setId of data.object.getKeys(1)) {
            let artSet = data.object.get(setId);

            for (const cond of artSet.getConditions(MAX_SET_SIZE)) {
                for (let str of [cond.params.title, cond.params.description]) {
                    if (!str) continue;

                    let lang_str = lang.get(str);
                    if (lang_str == str) {
                        result[str] = 1;
                    }
                }
            }
        }
    } else if (data.type == 'charcond') {
        for (const charId of data.object.getKeys(1)) {
            let char = data.object.get(charId);

            for (const cond of char.getAllConditions()) {
                for (let str of [cond.params.title, cond.params.description]) {
                    if (!str) continue;

                    let lang_str = lang.get(str);
                    if (lang_str == str) {
                        result[str] = 1;
                    }
                }
            }
        }
    } else if (data.type == 'charparty') {
        for (const charId of data.object.getKeys(1)) {
            let char = data.object.get(charId);

            for (const cond of char.getPartyConditions()) {
                for (let str of [cond.params.title, cond.params.description]) {
                    if (!str) continue;

                    let lang_str = lang.get(str);
                    if (lang_str == str) {
                        result[str] = 1;
                    }
                }
            }
        }
    }

    return result;
}

function getEmptyIds(items) {
    let result = [];

    for (const data of items) {
        if (!data.id) {
            result.push(data.key);
        }
    }

    return result;
}

function getDuplicatedIds(items) {
    let result = [];
    let ids = {};

    for (const data of items) {
        let id = data.id;
        if (!id) continue;

        if (!ids[id]) {
            ids[id] = [];
        }

        ids[id].push(data.key);
    }

    for (const id of Object.keys(ids)) {
        if (ids[id].length > 1) {
            result.push('id='+ id +' keys='+ ids[id].join(','));
        }
    }

    return result;
}
