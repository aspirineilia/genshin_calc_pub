import { REAL_TOTAL } from "../db/Constants";
import { Artifact } from "./Artifact";
import { Condition } from "./Condition";
import { FeatureCompiler } from "./Feature2/Compiler";
import { isPercent, Stats } from "./Stats";

const FEATURE_TYPE_INDEX = {
    'normal': 0,
    'crit': 1,
    'average': 2,
};

export class ArtifactsSuggestSort {
    constructor(data) {
        this.build = data.build.clone();
        this.featureName = data.featureName;
        this.featureIndex = FEATURE_TYPE_INDEX[data.featureType];
        this.settings = data.settings.sets_settings;
    }

    sort(artifacts, limit) {
        let items = artifactsListBySet(artifacts);
        let result = {};

        for (let slot of DB.Artifacts.Slots.getKeys()) {
            result[slot] = [];
        }

        for (let setName of Object.keys(items)) {
            emptyArtifacts(this.build, setName);
            this.build.artifacts.setSettings(Object.assign({}, this.settings));
            this.build.artifacts.removeInvalidSettings();

            let buildData = this.build.getBuildData();
            let feature = this.build.getFeatureByName(this.featureName);

            let tree = feature.getTree(buildData);
            let compiler = new FeatureCompiler(tree);
            let usedStats = compiler.usedStats;
            compiler.prepare(buildData);
            compiler.compile();

            for (let art of items[setName]) {
                emptyArtifacts(this.build, setName);
                this.build.setArtifact(art);
                this.build.artifacts.setSettings(Object.assign({}, this.settings));
                this.build.artifacts.removeInvalidSettings();

                buildData = this.build.getBuildData();
                buildData.stats.ensure(usedStats);

                let value = compiler.execute(buildData)[this.featureIndex] || 0;
                result[art.slot].push({
                    value: value,
                    art: art,
                });
            }
        }

        let final = [];
        for (let slot of DB.Artifacts.Slots.getKeys()) {
            if (result[slot].length > limit) {
                result[slot] = result[slot].sort((a, b) => {return b.value - a.value});
                result[slot].splice(limit)
            }

            for (let item of result[slot]) {
                final.push(item.art);
            }
        }

        return final;
    }
}

function emptyArtifacts(build, setId) {
    for (let slot of DB.Artifacts.Slots.getKeys()) {
        let art = new Artifact(5, 20, slot, setId, '', []);
        build.setArtifact(art);
    }
}

function artifactsListBySet(artifacts) {
    let result = {};

    for (let art of artifacts) {
        let set = art.getSet();
        if (!result[set]) { result[set] = [] }

        result[set].push(art);
    }

    return result;
}
