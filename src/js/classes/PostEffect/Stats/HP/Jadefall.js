import { PostEffectStatsHP } from "../HP";

export class PostEffectStatsHPJadefall extends PostEffectStatsHP {
    getPercents(data) {
        this.params.percent.stat = 'dmg_'+ data.settings.char_element;
        return super.getPercents(data);
    }
}
