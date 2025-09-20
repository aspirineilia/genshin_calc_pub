import { Condition } from "../Condition";
import { Stats } from "../Stats";

export class ConditionLithic extends Condition {
    getType() {
        return '';
    }

    getData(settings) {
        let stacks = 0;
        if (settings.char_origin == 'liyue') {
            ++stacks;
        }

        for (let i = 1; i <= 3; ++i) {
            let charId = settings['party_char_'+ i];
            if (!charId) {
                continue;
            }

            const char = DB.Chars.getById(charId);
            if (char.origin == 'liyue') {
                ++stacks;
            }
        }

        return {
            settings: {weapon_lithic_stacks: stacks},
            stats: new Stats({}),
        };
    }
}
