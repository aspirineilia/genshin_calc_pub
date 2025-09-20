import { ResultTableSuggester } from "../Suggester";

export class ResultTableSuggesterArtifactStat extends ResultTableSuggester {
    getGroupItems(build, opts) {
        let result = [];

        if (Array.isArray(opts.results)) {
            for (const item of opts.results) {
                let title = '';

                let stats = [];
                for (const slot of ['sands', 'goblet', 'circlet']) {
                    let stat = item.data[slot];
                    stats.push(stat || '');

                    if (stat) {
                        title += '<div class="gi-suggester-artifact-stat">';
                        title += '<div class="gi-suggester-artifact-slot '+ slot +'"></div>';
                        title += '<div class="gi-suggester-artifact-stat-text">'+ UI.Lang.get('stat.'+ stat) +'</div></div>';
                    }
                }

                result.push({
                    title: title,
                    suggestData: {
                        stats: stats.join(';'),
                    },
                    feature: item.feature,
                });
            }
        }

        return result;
    }
}
