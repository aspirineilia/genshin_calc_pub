import { MAX_SET_SIZE } from "../../src/js/classes/ArtifactSet.js";
import { DB } from "../../src/js/db/DB.js";
import { toBeEmptyArray } from "../../src/js/test/matchers.js";
import { Lang } from "../../src/js/ui/Lang.js";

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

for (const char of DB.Chars.getList(1)) {
    let items = getItems(char);

    test('Empty ids for '+ char.name, () => {
        expect(Object.keys(items)).toBeEmptyArray();
    });
}

function getItems(char) {
    let result = {};
    let lang_str = [];

    for (let talentType of Object.keys(char.talents.data)) {
        if (talentType == 'links') continue;

        let talent = char.talents.data[talentType];
        lang_str.push(talent.title);
        lang_str.push(talent.description);

        for (let item of talent.items) {
            let tables = Array.isArray(item.table) ? item.table : [item.table];
            let name = item.name || tables[0].getName()
            lang_str.push('feature_'+ talentType + '.'+ name);
        }
    }

    for (let str of lang_str) {
        if (!str) continue;

        let lang_str = lang.get(str);
        if (lang_str == str) {
            result[str] = 1;
        }
    }

    return result;
}
