import { Serializer } from "../../../classes/Serializer";
import { CharInfo } from "../CharInfo";

export class CharInfoLock extends CharInfo {
    getArtifacts(calcSet) {
        const artifacts = calcSet.getArtifacts();

        let html = '';

        for (const slot of Object.keys(artifacts)) {
            let art = artifacts[slot];

            if (art) {
                let artSet = DB.Artifacts.Sets.get(art.set);
                let locked = this.opts.locked.includes( Serializer.pack(art) );

                html += '<div class="gi-char-info-artifact border-rarity-'+ art.rarity +'">';
                html += '<div class="sprite sprite-40 sprite-artifact '+ slot +' '+ artSet.getImage() +'"></div>'
                if (locked) {
                    html += '<div class="gi-char-info-artifact-locked"></div>';
                }
                html += '</div>';
            }
        }

        return html;
    }
}
