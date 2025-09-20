import "../../../../../css/ui/Widget/ResultTable/Compare.css"

import { ResultTableSuggester } from "../Suggester";

export class ResultTableSuggesterCompare extends ResultTableSuggester {
    getColumns() {
        return [
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

    getSuggestColumn(item) {
        return null;
    }

    getMaxFeature(build, opts) {
        return opts.baseFeature;
    }

    getGroupItems(build, opts) {
        let result = [];

        if (Array.isArray(opts.results)) {
            for (const item of opts.results) {

                let html = '<div class="gi-compare-info" data-id="'+ item.index +'">';

                html += '<div class="gi-compare-name">';

                html += '<div class="gi-radio-wrapper">';
                html += '<input class="gi-radio" type="radio" id="compare_base_'+ item.index +'" name="compare_base" value="'+ item.index +'"'+ (item.index == opts.baseIndex ? ' checked' : '') +'>'
                html += '<label for="compare_base_'+ item.index +'"></label>';
                html += '</div>'

                html += '<div class="gi-compare-name-edit"></div>';
                html += '<div class="gi-compare-name-title">'+ item.title +'</div></div>';

                html += '<span class="gi-suggester-table-button button-load">'+ UI.Lang.get('compare_view.load_set') +'</span> ';
                html += '<span class="gi-suggester-table-button button-delete">'+ UI.Lang.get('compare_view.delete_set') +'</span>';
                html += '</div>';

                result.push({
                    title: html,
                    feature: item.feature,
                    more: item.more,
                });
            }
        }

        return result;
    }
}
