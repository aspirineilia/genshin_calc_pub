import $ from "jquery";
import "../../../css/ui/Widget/Artifact.css"
import { Stats } from "../../classes/Stats";

const defaultOpts = {
    showWeapon: true,
    showArtifacts: true,
};

export class ArtifactWidget {
    constructor(opts) {
        this.opts = Object.assign({}, defaultOpts, opts);
    }

    get(art, opts) {
        opts ||= {};

        let item = $('<div class="artifact-list-box '+ art.slot +' border-rarity-'+ art.rarity +'"></div>');
        item.data('art', art);

        const setData  = DB.Artifacts.Sets.get(art.set);
        const imgClass = setData ? setData.getImage() : '';

        if (opts.isEquipped) {
            item.addClass('equipped');
        }

        let html = '<div class="artifact-list-box-line">';
        html += '<div class="artifact-list-box-image sprite sprite-artifact sprite-60 '+ imgClass +' '+ art.slot +'"></div>';
        html += '<div class="artifact-list-box-main">';

        html += '<div class="artifact-list-box-buttons">';
        html += this.getButtons(opts);
        html += '</div>';

        html +=  this.getMainstat(art, opts);
        html +=  this.getSubstats(art, opts);

        if (!art.isValid()) {
            html += '<div class="artifact-list-box-invalid" data-tooltip=""></div>';
        }

        item.append(html);

        return item;
    }

    getButtons(opts) {
        let html = '';

        if (this.opts.buttons) {
            for (const button of this.opts.buttons) {
                html += '<div class="artifact-list-box-button '+ button.class +'" data-tooltip="'+ UI.Lang.get(button.title) +'"></div>';
            }
        }

        return html;
    }

    getMainstat(art, opts) {
        const mainStat = art.getMainStat() || '';
        let html = '<div class="artifact-list-box-mainstat"><span class="stat">';

        if (mainStat) {
            html += UI.Lang.get('stat_short.'+ mainStat.replace('_percent', ''));
        }

        html += '</span></div>';
        html += '<div class="artifact-list-box-mainstat"><span class="value '+ (mainStat == opts.selectedStat ? 'selected' : '') +'">';
        html += Stats.format(mainStat, art.getMainStatValue(), {signed: true});
        html += '</span><span class="stat"> (+'+ art.getLevel() +')</span></div></div></div>';
        return html;
    }

    getSubstats(art, opts) {
        let html = '';

        for (const substat of art.subStats) {
            let stat = UI.Lang.get('stat_mini.'+ substat.stat.replace('_percent', ''));
            html += '<div class="artifact-list-box-substat"><span class="stat">'+ stat +'</span> ';
            html += '<span class="value '+ (substat.stat == opts.selectedStat ? 'selected' : '') +'">';
            html += Stats.format(substat.stat, substat.value, {signed: false}) +'</span></div>';
        }

        return html;
    }
}
