import { Stats } from "../Stats";
import { Condition } from "../Condition";

export class ConditionCalcOrigin extends Condition {
    getData(settings) {
        let same_origin = 0;
        let other_origin = 0;

        if (this.isActive(settings) && settings && settings.char_id) {
            let origin = DB.Chars.getById(settings.char_id).getOrigin();

            for (const name of ['party_char_1', 'party_char_2', 'party_char_3']) {
                const char_id = settings[name] || '';
                if (!char_id) continue;

                let char = DB.Chars.getById(char_id);
                if (!char) continue;

                if (origin == char.getOrigin()) {
                    ++same_origin;
                } else {
                    ++other_origin;
                }
            }
        }

        return {
            settings: {
                party_origin_same: same_origin,
                party_origin_same_inc: same_origin + 1,
                party_origin_different: other_origin,
            },
            stats: new Stats(),
        };
    }

    getAllConditionsOn(settings) {
        return this.getData(settings || {}).settings
    }

    getStats(settings) {
        return new Stats();
    }
}
