import { Stats } from "../../../classes/Stats";
import { ArtifactWidget } from "../Artifact";

export class ArtifactWidgetSimilar extends ArtifactWidget {
    getButtons(opts) {
        let id = 'storage_index_'+ opts.index;
        let html = '<div class="gi-radio-wrapper">';
        html += '<input class="gi-radio" type="radio" id="'+ id +'" name="storage_index" value="'+ opts.index +'" ';
        if (opts.selected) {
            html += 'checked="checked"';
        }

        html += '><label for="'+ id +'"><span class="span-label">'+ UI.Lang.get('scanner.use_similar') +'</span></label></div>';
        return html;
    }

    getMainstat(art, opts) {
        const mainStat = art.getMainStat() || '';

        let selected = false;
        if (opts.sample && opts.sample.getMainStatValue() > art.getMainStatValue()) {
            selected = true;
        }

        let html = '<div class="artifact-list-box-mainstat"><span class="stat">';
        html += UI.Lang.get('stat_short.'+ mainStat.replace('_percent', '')) +'</span></div>';
        html += '<div class="artifact-list-box-mainstat"><span class="value '+ (selected ? 'selected' : '') +'">';
        html += Stats.format(mainStat, art.getMainStatValue(), {signed: true});
        html += '</span><span class="stat"> (+'+ art.getLevel() +')</span></div></div></div>';
        return html;
    }

    getSubstats(art, opts) {
        let html = '';

        for (let i = 0; i < art.subStats.length; ++i) {
            const substat = art.subStats[i];

            let selected = false;

            if (opts.sample) {
                let ss = opts.sample.subStats[i];

                if (ss && ss.stat == substat.stat && ss.value > substat.value) {
                    selected = true;
                } else if (!ss) {
                    selected = true;
                }
            }

            const stat = UI.Lang.get('stat_mini.'+ substat.stat.replace('_percent', ''));

            html += '<div class="artifact-list-box-substat"><span class="stat">'+ stat +'</span> ';
            html += '<span class="value '+ (selected ? 'selected' : '') +'">';
            html += Stats.format(substat.stat, substat.value, {signed: false}) +'</span></div>';
        }

        return html;
    }
}
