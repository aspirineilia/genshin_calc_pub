import { ResultTableSuggester } from "../Suggester";

export class ResultTableSuggesterWeapon extends ResultTableSuggester {
    getGroupItems(build, opts) {
        let result = [];

        if (Array.isArray(opts.results)) {
            for (const item of opts.results) {
                let weaponTitle = UI.Lang.get(item.weapon.getName());

                let comment = '<span class="gi-suggester-table-remark">'+ UI.Lang.get('object_view.weapon_refine') +': </span>';
                comment += '<span class="gi-suggester-table-remark-value">'+ item.refine +'</span>';
                if (item.name) {
                    comment += '<span class="gi-suggester-table-remark">, '+ UI.Lang.get('weapon_settings.'+ item.name) +'</span>';
                }
                comment += '</span>';

                result.push({
                    title: [
                        weaponTitle,
                        comment
                    ],
                    suggestData: {
                        id: item.weapon.getId(),
                        refine: item.refine,
                        index: item.index,

                    },
                    feature: item.feature,
                });
            }
        }

        return result;
    }
}
