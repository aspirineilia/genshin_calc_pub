import { Feature } from "../../../classes/Feature";
import { formatNumber } from "../../../Utils";
import { ResultTable } from "../ResultTable";

export class ResultTableFeatures extends ResultTable {
    getGroups(build) {
        let stats    = build.getStats();
        let features = build.getFeatures(stats, 1);
        let tree     = Feature.getTree(features);

        let groups = [];

        for (const section in tree) {
            if (section == 'stats') {
                continue;
            }
            let rows = [];
            let blocks = tree[section];

            for (const block in blocks) {
                let data = blocks[block];
                if (data.hidden) {
                    continue
                }
                let str = 'feature_'+ section +'.'+ block;
                let format = data.format || '';
                let className;

                if (data.title) {
                    str = data.title;
                }

                let title = UI.Lang.get(str);

                if (data.isChild) {
                    className = 'optional';
                    title = '• '+ title;
                }

                if (data.hits && data.hits > 1) {
                    title += ' ('+ data.hits +' '+ UI.Lang.get('feature_attack.hits') +')';
                }
                let item = {
                icon: data.icon ? '<div class="gi-stat-element-icon stat-'+ data.icon +'"></div>' : '',
                    title: title,
                    subtext: '',
                    normal: '',
                    crit: '',
                    average: '',
                };

                let html = '<tr class="colored-row">';
                html += '<td>'+ title;

                if (data.portion) {
                    item.subtext = '<span class="gi-suggester-table-remark">'+ data.portion.toFixed(1) +'%</span>';
                }

                for (const field of ['normal', 'crit', 'average']) {
                    let value = data[field];

                    if (format == 'percent') {
                        value = formatNumber(value, {percent: true, digits: data.digits});
                    } else if (format == 'decimal') {
                        value = formatNumber(value, {digits: data.digits});
                    } else {
                        value = formatNumber(Math.round(value));
                    }

                    item[field] = value;
                }

                rows.push({
                    class: className,
                    items: [
                        {
                            text: item.title,
                            subtext: item.subtext,
                        },
                        {text: item.icon},
                        {text: item.normal},
                        {text: item.crit},
                        {text: item.average},
                    ],
                });
            }

            groups.push({
                title: UI.Lang.get('feature_section.'+ section),
                rows: rows,
            });

            delete tree[section];
        }

        return groups;
    }

    getColumns() {
        return [
            {
                title: '',
                class: 'gi-result-table-default',
            },
            {
                title: '',
                class: 'gi-result-table-icon',
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

