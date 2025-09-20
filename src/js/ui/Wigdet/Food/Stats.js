import "../../../../css/ui/Widget/Food/Stats.css"

import { Stats } from "../../../classes/Stats";

const defaultOpts = {};

export class WidgetFoodStats {
    constructor(opts) {
        this.opts = Object.assign({}, defaultOpts, opts);
    }

    getHtml(food, level) {
        let html = '';

        if (food && this.opts.showIcon) {
            let icon = '';
            if (level == 4) {
                icon = food.getSpecialIcon();
            } else {
                icon = food.getIcon();
            }
            html += '<div class="gi-food-icon '+ icon +'"></div>';
        }

        if (food && level) {
            const stats = food.getStats(level);

            for (const stat of Object.keys(stats)) {
                html += '<div class="gi-food-stat">';
                html += '<span class="gi-food-stat-name">'+ UI.Lang.get('stat_short.'+ stat) +'</span>';
                html += '<span class="gi-food-stat-value">'+ Stats.format(stat, stats.get(stat), {signed: 1, no_decimal_zero: 1}) +'</span>';
                html += '</div>';
            }
        } else {
            html += '<div class="gi-food-stat"><div class="gi-food-stat-empty">'+ UI.Lang.get('food_name.not_selected') +'</div></div>';
        }

        return html;
    }
}
