import "../../../../css/ui/Widget/ResultTable/Food.css"

import { ResultTableSuggester } from "./Suggester";
import { Stats } from "../../../classes/Stats";
import { WidgetFoodStats } from "../Food/Stats";

const statWidget = new WidgetFoodStats({});

export class ResultTableFood extends ResultTableSuggester {
    getFoodTitle(item) {
        let prefix = item.food.getPrefix();

        if (item.level == 4) {
            prefix = item.food.getSpecialPrefix();
        }

        let html = '<div class="gi-food-title">';
        if (item.food.hasQuality()) {
            html += '<span class="gi-food-icon-quality">'+ UI.Lang.get('food_view.quality_'+ prefix +'_'+ item.level) +'</span>';
        }
        html += UI.Lang.get(item.level == 4 ? item.food.getSpecialName() : item.food.getName());
        html += '</div>';

        return html;
    }

    getFoodStats(item) {
        let html = '<div class="gi-food-icon-line">';
        html += '<div class="gi-food-icon '+ (item.level == 4 ? item.food.getSpecialIcon() : item.food.getIcon()) +'"></div>';
        if (item.level == 4) {
            let charName = item.food.getSpecialChar();
            let char = DB.Chars.get(charName);

            if (char) {
                html += '<div class="gi-food-icon-char '+ char.getIcon() +'"></div>';
            }
        }
        html += '<div class="gi-food-icon-line-stat">';
        html += statWidget.getHtml(item.food, item.level);
        html += '</div></div>';

        return html;
    }

    getGroups(build, opts) {
        opts = Object.assign({}, opts);

        let rows  = [];
        let items = opts.results;

        if (opts.feature) {
            let max = this.getMaxFeature(build, opts);

            for (const item of items) {
                let cols = [];
                let active = false;

                if (item.food && item.food.getId() == opts.foodId && item.level == opts.foodLevel) {
                    active = true;
                }

                cols.push(
                    {
                        text: this.getFoodTitle(item),
                    },
                    {
                        text: this.getFoodStats(item),
                    },
                );

                let values = {normal: '', crit: '', average: ''};

                for (const key of ['normal', 'crit', 'average']) {
                    let value = item.feature[key];

                    if (value) {
                        let diffLine = this.formatFeatureDiff(value, max[key], opts);

                        values[key] = [
                            Stats.format('', item.feature[key], {minimize: true}),
                            diffLine,
                        ];
                    }
                }

                cols.push(
                    {text: values.normal},
                    {text: values.crit},
                    {text: values.average},
                );

                rows.push({
                    class: (active ? 'active ' : '') + 'border-rarity-'+ item.food.getRarity(),
                    dataAttrs: {
                        id: item.food.getId(),
                        level: item.level,
                    },
                    items: cols
                });
            }
        }

        return [{
            rows: rows,
        }];
    }

    getColumns() {
        return [
            {
                title: '',
                class: 'gi-result-table-fullline',
                ignoreCaption: true,
            },
            {
                title: '',
                class: 'gi-result-table-default',
            },
            {
                title: UI.Lang.get('stat_view.normal'),
                class: 'gi-result-table-feature',
            },
            {
                title: UI.Lang.get('stat_view.crit'),
                class: 'gi-result-table-feature',
            },
            {
                title: UI.Lang.get('stat_view.average'),
                class: 'gi-result-table-feature',
            },
        ];
    }
}
