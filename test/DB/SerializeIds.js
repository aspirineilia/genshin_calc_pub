import { MAX_SET_SIZE } from "../../src/js/classes/ArtifactSet";
import { Condition } from "../../src/js/classes/Condition";
import { DB } from "../../src/js/db/DB";
import { toBeEmptyArray } from "../../src/js/test/matchers";

let list = [
    {name: 'Chars',         object: DB.Chars,               type: ''},
    {name: 'Chars cond',    object: DB.Chars,               type: 'charcond'},
    {name: 'Chars party',   object: DB.Chars,               type: 'charparty'},
    {name: 'Artifact sets', object: DB.Artifacts.Sets,      type: ''},
    {name: 'Artifact cond', object: DB.Artifacts.Sets,      type: 'artset'},
    {name: 'Weapons',       object: DB.Weapons,             type: 'tree'},
    {name: 'Enemies',       object: DB.Enemies,             type: 'tree'},
    {name: 'Buffs',         object: DB.Buffs,               type: 'buff'},
    {name: 'Food.Attack',   object: DB.Food.get('Attack'),  type: ''},
    {name: 'Food.Defence',  object: DB.Food.get('Defence'), type: ''},
    {name: 'Food.Potion',   object: DB.Food.get('Potion'),  type: ''},
];

expect.extend({toBeEmptyArray});

for (const data of list) {
    let items = getItems(data);

    test('Empty ids for '+ data.name, () => {
        expect( getEmptyIds(items) ).toBeEmptyArray();
    });

    test('Duplicate ids for '+ data.name, () => {
        expect( getDuplicatedIds(items) ).toBeEmptyArray();
    });
}

function getItems(data) {
    let result = [];

    if (data.type == 'tree') {
        for (const block of data.object.getKeys()) {
            let blockObject = data.object.get(block);

            for (const key of blockObject.getKeys()) {
                result.push({
                    key: block +'.'+ key,
                    id: blockObject.get(key).getId(),
                });
            }
        }
    } else if (data.type == 'buff') {
        for (const block of data.object.getKeys()) {
            let blockObject = data.object.get(block);

            for (const cond of Condition.unwrap(blockObject.getConditions())) {
                if (!cond.isSerializable()) {
                    continue;
                }

                let id = cond.getName() ? cond.getId() : 0;

                result.push({
                    key: block +'.'+ cond.getName(),
                    id: id,
                });
            }
        }
    } else if (data.type == 'artset') {
        for (const setId of data.object.getKeys()) {
            let artSet = data.object.get(setId);

            for (const cond of artSet.getConditions(MAX_SET_SIZE)) {
                if (!cond.isSerializable()) {
                    continue;
                }

                let id = cond.getName() ? cond.getId() : 0;

                result.push({
                    key: setId +'.'+ cond.getName(),
                    id: id,
                });
            }
        }
    } else if (data.type == 'charcond') {
        for (const charId of data.object.getKeys()) {
            let char = data.object.get(charId);

            for (const cond of char.getAllConditions()) {
                if (!cond.isSerializable()) {
                    continue;
                }

                let id = cond.getName() ? cond.getId() : 0;

                result.push({
                    key: charId +'.'+ cond.getName(),
                    id: id ? charId +'.'+ id : 0,
                });
            }
        }
    } else if (data.type == 'charparty') {
        for (const charId of data.object.getKeys()) {
            let char = data.object.get(charId);

            for (const cond of char.getPartyConditions()) {
                if (!cond.isSerializable()) {
                    continue;
                }

                let id = cond.getName() ? cond.getId() : 0;

                result.push({
                    key: charId +'.'+ cond.getName(),
                    id: id ? charId +'.'+ id : 0,
                });
            }
        }
    } else {
        for (const key of data.object.getKeys()) {
            result.push({
                key: key,
                id: data.object.get(key).getId(),
            });
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
