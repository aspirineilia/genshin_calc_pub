import { BuildSettings } from "../Build/Settings";
import { CalcObject } from "../CalcObject";
import { Stats } from "../Stats";

export class CalcObjectReaction extends CalcObject {
    isBeta() {
        return false;
    }

    getSettings() {
        return {};
    }

    getStats(settings) {
        return {
            stats: new Stats(),
            settings: new BuildSettings({}),
        };
    }

    getConditions() {
        return [];
    }

    getFeatures() {
        return DB.Features.Reactions;
    }

    getPostEffects() {
        return [];
    }
}
