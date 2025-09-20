import { REAL_TOTAL } from "../db/Constants";
import { Artifact } from "./Artifact";
import { filterPostEffectTreeByStats } from "./Build/Data";
import { Condition } from "./Condition";
import { CBlock } from "./Feature2/Compile/Types";
import { FeatureCompiler } from "./Feature2/Compiler";
import { isPercent, Stats } from "./Stats";

const FEATURE_TYPE_INDEX = {
    'normal': 0,
    'crit': 1,
    'average': 2,
};

const DYNAMIC_STATS = ['crit_value'];

export class ArtifactsSuggest {
    constructor(data) {
        this.build = data.build;
        this.artifacts = data.artifacts;
        this.featureName = data.featureName;
        this.featureType = data.featureType;
        this.settings = data.settings;
        this.limit = data.limit || 20;
    }

    prepare() {
        this.currentArts = this.build.getArtifacts();
        this.build.clearArtifacts();
        // this.addArtifactPostSettings();
        this.build.artifacts.modifySettings(this.settings.sets_settings);

        this.buildData = this.build.getBuildData();

        // ???
        let baseConditions = this.build.getActiveConditions(this.buildData.settings);
        Condition.setCommonValues(this.buildData.settings, baseConditions);

        this.prepareArtifactSets();
        this.prepareDynamicStats();

        let compilerOpts = {
            // dontProcessTree: 1,
            ignoreSideEffects: 1,
            staticStats: [],
        };

        this.featureVariants = {};
        this.usedStats = [];
        let variationData = [];

        let statFilterUsedStats = [];
        for (let name of Object.keys(this.settings.stats || {})) {
            name = name.replace('_min', '').replace('_max', '');
            statFilterUsedStats.push(name);
            statFilterUsedStats.push(name +'_base');
            if (REAL_TOTAL.includes(name)) {
                statFilterUsedStats.push(name +'_percent');
            }
        }

        this.usedStats = this.usedStats.concat(statFilterUsedStats);

        for (let variant of this.getVariations()) {
            let vBuild = this.build.clone();
            let setSettings = Object.assign({}, this.settings.sets_settings);
            let variantNames = [];
            let artSetIds = [];

            for (let vItem of variant) {
                if (vItem.setId) {
                    variantNames.push(vItem.name);
                    setSettings[ Artifact.settingName(vItem.setId) ] = vItem.pieces;
                    for (let i = 0; i < vItem.pieces; ++i) {
                        artSetIds.push(vItem.setId);
                    }
                }
            }

            for (let slot of DB.Artifacts.Slots.getKeys()) {
                let setId = artSetIds.pop();
                if (!setId) break;

                let art = new Artifact(5, 20, slot, setId, '', []);
                vBuild.setArtifact(art);
            }

            let variandId = variantNames.sort().join('-') || 'default';
            vBuild.artifacts.modifySettings(setSettings);
            let vBuildData = vBuild.getBuildData();
            this.addDynamicStats(vBuildData.getActivePostEffectsTree());
            let feature = vBuild.getFeatureByName(this.featureName);

            // FIXME rotation detect
            if (feature.items) {
                this.addDynamicStatsFromItems(vBuildData, feature.items);
            }

            variationData.push({
                variandId: variandId,
                feature: feature,
                buildData: vBuildData,
            });
        }

        for (let item of variationData) {
            let activePostTree = item.buildData.postEffectTreeByPriority();
            let postTrees = this.filterPostEffects(item.feature, item.buildData);

            let tree = item.feature.getTree(item.buildData, compilerOpts);
            let compiler = new FeatureCompiler(tree, postTrees);

            let usedStats = compiler.usedStats;
            this.usedStats = this.usedStats.concat(usedStats);
            usedStats = usedStats.concat(statFilterUsedStats);
            item.buildData.stats.ensure(usedStats);

            compilerOpts.staticStats = this.makeStaticStats(usedStats);

            compiler.prepare(item.buildData, compilerOpts);
            compiler.compile(compilerOpts);

            compiler.checkFunc = makeStatCheckFunc(this.settings.stats, activePostTree);

            this.featureVariants[item.variandId] = compiler;
        }

        this.buildData.stats.truncate(this.usedStats);
        this.buildData.stats.ensure(this.usedStats);

        this.prepareArtifacts();
    }

    getVariations() {
        let usedVariations = {};
        let variations = [];

        for (let setId of Object.keys(this.setData)) {
            for (let pieces of Object.keys(this.setData[setId])) {
                let data = this.setData[setId][pieces];
                if (data.variation && !usedVariations[data.variation]) {
                    usedVariations[data.variation] = 1;
                    variations.push({
                        name: data.variation,
                        setId: setId,
                        pieces: parseInt(pieces),
                    });
                }
            }
        }

        let variationCombinations = [
            [{name: 'default'}],
        ];

        for (let i = 0; i < variations.length; ++i) {
            let item1 = variations[i];
            variationCombinations.push([item1]);

            for (let j = i + 1; j < variations.length; ++j) {
                let item2 = variations[j];
                if (item1.pieces + item2.pieces <= 5) {
                    variationCombinations.push([item1, item2]);
                }
            }
        }

        return variationCombinations;
    }

    filterPostEffects(feature, buildData) {
        if (feature.isRotation()) {
            return [];
        }

        let postItems = buildData.postEffectTreeByPriority();
        buildData.postEffects = [];
        let result = [];

        for (let items of postItems) {
            let tree = feature.getTree(buildData);
            let compiler = new FeatureCompiler(tree, result);
            let usedStats = compiler.usedStats;

            for (let item of items) {
                for (let stat of item.getAssignedStats()) {
                    if (usedStats.includes(stat)) {
                        result.push(item);
                    }
                }
            }
        }

        return result;
    }

    prepareArtifacts() {
        this.slots = {
            flower: [],
            plume: [],
            sands: [],
            goblet: [],
            circlet: [],
        };
        this.setNames = {};
        this.totalCombinations = 1;

        for (let art of this.artifacts) {
            this.setNames[art.set] = 1;

            art.calcCache(this.usedStats);
            art.concatFunc = art.calculated.getConcatFunc();
            this.slots[art.slot].push(art);
        }

        for (const slot of Object.keys(this.slots)) {
            if (this.slots[slot].length == 0) {
                let curArt = this.currentArts[slot];
                if (curArt) {
                    curArt.calcCache(this.usedStats);
                    this.slots[slot].push(curArt);
                } else {
                    let emptyArtifact = new Artifact(5, 0, slot, 'none', 'none', []);
                    emptyArtifact.isEmpty = true;
                    emptyArtifact.calculated = new Stats();
                    emptyArtifact.concatFunc = emptyArtifact.calculated.getConcatFunc();
                    this.slots[slot].push(emptyArtifact);
                }
            }

            this.totalCombinations *= this.slots[slot].length;
        }
    }

    prepareArtifactSets() {
        let setPieces = {};
        for (let art of this.artifacts) {
            if (!setPieces[art.set]) {
                setPieces[art.set] = {};
            }
            setPieces[art.set][art.slot] = 1;
        }

        let setMaxPieces = {};
        for (let setName of Object.keys(setPieces)) {
            setMaxPieces[setName] = Object.keys(setPieces[setName]).length
        }


        this.setData = {};
        // let baseSettings = Object.assign({}, this.buildData.settings, this.settings.sets_settings);
        let baseSettings = Object.assign({}, this.buildData.settings);

        // let artPostItems = DB.Buffs.get('Artifacts').getPostEffects();
        // let postArtNames = [];
        // for (let item of artPostItems) {
        //     if (item.params.suggesterPieces) {
        //         postArtNames.push(item.params.suggesterPieces);
        //     }
        // }

        let activePostEffects = this.buildData.getActivePostEffects().length;

        for (let setId of DB.Artifacts.Sets.getKeys()) {
            let set = DB.Artifacts.Sets.get(setId);
            let bonuses = set.getConditionsByPieces();

            let setStats = new Stats();
            let setPostStats;
            let setTotalSettings = {};
            let artPiecesName = Artifact.settingNameShort(setId);
            let maxPieces = setMaxPieces[setId] || 0;

            let buildData = this.build.getBuildData();
            let prevActivePostEffects = activePostEffects;
            let featureVariation = '';

            for (let pieces = 1; pieces < bonuses.length; ++pieces) {
                if (pieces > maxPieces) {
                    break
                }

                buildData.addSettings({[Artifact.settingName(setId)]: pieces});

                const conditions = bonuses[pieces];
                let pieceSettings = {};

                if (conditions.length) {
                    pieceSettings = Condition.allConditionsOn(conditions, baseSettings);
                    for (let key of Object.keys(pieceSettings)) {
                        if (baseSettings.hasOwnProperty(key)) {
                            pieceSettings[key] = baseSettings[key];
                        }
                    }
                    let localSettings = Object.assign({}, pieceSettings, baseSettings);

                    let stats = new Stats();

                    for (let cond of conditions) {
                        let data = cond.getData(localSettings);
                        stats.concat(data.stats);
                    }

                    // stats.truncate(this.usedStats); // TODO нужно пересчитать после обработки всех variation
                    setStats.concat(stats);
                    Object.assign(setTotalSettings, pieceSettings);
                    buildData.addSettings(pieceSettings);
                }

                // change variation if new togglable condition or post effect appears
                let curActivePostEffects = buildData.getActivePostEffects().length;
                let curSerializableConditions = conditions.filter((i) => {return i.isSerializable()}).length
                if (curActivePostEffects > prevActivePostEffects) {
                    prevActivePostEffects = curActivePostEffects;
                    featureVariation = artPiecesName + pieces;
                } else if (curSerializableConditions) {
                    featureVariation = artPiecesName + pieces;
                }

                if (Object.keys(setStats).length || setPostStats || featureVariation) {
                    let s = new Stats(setStats);
                    s.processPercent();

                    if (!this.setData[setId]) {
                        this.setData[setId] = {};
                    }

                    this.setData[setId][pieces] = {
                        stats: s,
                        variation: featureVariation,
                        concatFunc: s.getConcatFunc(),
                    };
                }
            }
        }
    }

    prepareDynamicStats() {
        let stats = {};

        for (let stat of DB.Artifacts.Mainstats.getKeys()) {
            stats[stat] = 1;
        }

        for (let stat of DB.Artifacts.Substats.getKeys()) {
            stats[stat] = 1;
        }

        for (let setId of Object.keys(this.setData)) {
            for (let pieces of Object.keys(this.setData[setId])) {
                let setStats = this.setData[setId][pieces].stats;
                for (let stat of Object.keys(setStats)) {
                    if (/^text_/.test(stat)) continue;
                    stats[stat] = 1;
                }
            }
        }

        this.dynamicStats = Object.keys(stats);
    }

    addDynamicStats(items) {
        for (let item of items) {
            if (item.stat && !this.dynamicStats.includes(item.stat)) {
                this.dynamicStats.push(item.stat);
            }
        }
    }

    addDynamicStatsFromItems(buildData, items) {
        for (let item of items) {

            if (item.postEffects) {
                for (let post of item.postEffects) {
                    if (!post.getTree) continue;
                    this.addDynamicStats(post.getTree(buildData));
                }
            }

            if (item.items) {
                this.addDynamicStatsFromItems(buildData, item.items);
            }

            if (item.conditions) {
                this.addDynamicStatsFromItems(buildData, item.conditions);
            }
        }
    }

    makeStaticStats(usedStats) {
        let result = [];

        for (let stat of usedStats) {
            if (this.dynamicStats.includes(stat)) continue;
            if (DYNAMIC_STATS.includes(stat)) continue;
            result.push(stat);
        }

        return result;
    }

    getResult(callback) {
        let combination;
        let results = [];
        let minimalValue = 0;
        this.currentCombinations = 0;
        this.skippedCombinations = 0;

        let artifacts;
        let artSets;
        let artStats;
        let featureData;
        let value;
        let featureIndex = FEATURE_TYPE_INDEX[this.featureType];

        let initialStatFunc = this.buildData.stats.getSetFunc();
        let generator = artifactCombinations(this.settings, this.setNames, this.slots, (val) => {
            this.currentCombinations += val;
            this.skippedCombinations += val;
            if (callback && this.currentCombinations % 50000 == 0 || val > 50000) {
                callback(this.currentCombinations, this.totalCombinations, this.skippedCombinations);
            }
        });

        callback(this.currentCombinations, this.totalCombinations, this.skippedCombinations);

        while (combination = generator.next()) {
            if (combination.done) {
                break;
            }

            ++this.currentCombinations;
            artSets = {};
            artifacts = combination.value;
            artStats = new Stats();
            initialStatFunc(artStats);

            for (let item of artifacts) {
                if (item) {
                    artSets[item.set] = (artSets[item.set] || 0) + 1;
                    item.concatFunc(artStats);
                }
            }

            let variation = [];
            for (let id in artSets) {
                let sdata = this.setData[ id ] && this.setData[ id ][ artSets[id] ];
                if (!sdata) continue;

                if (sdata.variation) {
                    variation.push(sdata.variation)
                }

                if (sdata.concatFunc) {
                    sdata.concatFunc(artStats);
                }
            }

            variation = variation.sort().join('-') || 'default';
            let compiler = this.featureVariants[variation];

            // check for stat requirements
            if (!compiler.checkFunc || compiler.checkFunc(artStats)) {
                this.buildData.stats = artStats;
                featureData = compiler.execute(this.buildData);
                value = featureData[featureIndex] || 0;

                if (value >= minimalValue) {
                    results.push({
                        value: value,
                        artifacts: artifacts,
                    });
                }
            } else {
                ++this.skippedCombinations;
            }

            if (callback && this.currentCombinations % 50000 == 0) {
                if (results.length > this.limit * 100) {
                    truncateResults(results, this.limit);
                    minimalValue = results[results.length - 1].value;
                }

                callback(this.currentCombinations, this.totalCombinations, this.skippedCombinations);
            }
        }

        callback(this.currentCombinations, this.totalCombinations, this.skippedCombinations);
        truncateResults(results, this.limit);
        removeEmptyArtifacts(results);

        return results;
    }


}

function* artifactCombinations(settings, setNames, slots, skipCallback) {
    let s1, s2, s3, s4, s5;

    let sets = {};
    for (let name of Object.keys(setNames)) {
        sets[name] = 0;
    }

    let checkFunc = generateCheckFunc(settings);
    let requireFunc = generateRequireFunc(settings);

    let skip5 = slots.circlet.length;
    let skip4 = skip5 * slots.goblet.length;
    let skip3 = skip4 * slots.sands.length;

    for (let i1 = 0; i1 < slots.flower.length; --sets[s1.set], ++i1) {
        s1 = slots.flower[i1];
        ++sets[s1.set];

        for (let i2 = 0; i2 < slots.plume.length; --sets[s2.set], ++i2) {
            s2 = slots.plume[i2];
            ++sets[s2.set];

            if (checkFunc(sets)) {
                skipCallback(skip3);
                continue;
            }

            for (let i3 = 0; i3 < slots.sands.length; --sets[s3.set], ++i3) {
                s3 = slots.sands[i3];
                ++sets[s3.set];

                if (checkFunc(sets)) {
                    skipCallback(skip4);
                    continue;
                }

                for (let i4 = 0; i4 < slots.goblet.length; --sets[s4.set], ++i4) {
                    s4 = slots.goblet[i4];
                    ++sets[s4.set];

                    if (checkFunc(sets)) {
                        skipCallback(skip5);
                        continue;
                    }

                    for (let i5 = 0; i5 < slots.circlet.length; --sets[s5.set], ++i5) {
                        s5 = slots.circlet[i5];
                        ++sets[s5.set];

                        if (checkFunc(sets) || requireFunc(sets)) {
                            skipCallback(1);
                            continue;
                        }

                        yield [s1, s2, s3, s4, s5];
                    }
                }
            }
        }
    }
}


function truncateResults(results, limit) {
    results = results.sort(function(a,b) {
        return b.value - a.value;
    });
    results.splice(limit);
}

function removeEmptyArtifacts(results) {
    for (let item of results) {
        let arts = [];
        for (let art of item.artifacts) {
            if (art.isEmpty) continue;
            arts.push(art);
        }
        item.artifacts = arts;
    }
}

function generateCheckFunc(settings) {
    let parts = [];
    for (let [setName, pieces] of Object.entries(settings.setMaxValues)) {
        parts.push('if (sets.'+ setName +' >= '+ pieces +') {return true}');
    }

    parts.push('return false');
    return Function('sets', parts.join(';'));
}

function generateRequireFunc(settings) {
    let parts = [];
    for (let [setName, pieces] of Object.entries(settings.setMinValues)) {
        parts.push('if (sets.'+ setName +' < '+ pieces +') {return true}');
    }

    parts.push('return false');
    return Function('sets', parts.join(';'));
}

function makeStatCheckFunc(settings, post) {
    let [parts, usedStats] = makeStatCheckParts(settings);
    if (parts.length == 0) return;

    let code = parts.join(';\n');

    let filtered = filterPostEffectTreeByStats(post, usedStats);
    if (filtered) {
        let [assign, revert] = FeatureCompiler.postTreeBlocks(filtered);
        let before = getBlockCode(assign);
        let after = getBlockCode(revert);

        code = before +';\n' + code + ';\n'+ after;
    }

    // console.log(code)
    return Function('stats', code + ';\nreturn true');
}

function makeStatCheckParts(settings) {
    let parts = [];
    let usedStats = [];

    for (let name of Object.keys(settings)) {
        let [str, stat, op] = /^(.*)_(min|max)$/.exec(name);
        let value = settings[name];
        if (!value) continue;

        if (isPercent(stat)) {
            value /= 100;
        }

        let statStr;
        if (REAL_TOTAL.includes(stat)) {
            statStr = 'stats.'+ stat +'_base * (1 + stats.'+ stat + '_percent) + stats.'+ stat;
        } else {
            statStr = 'stats.'+ stat +'_base + stats.'+ stat;
        }

        if (!usedStats.includes(stat)) {
            usedStats.push(stat);
            usedStats.push(stat + '_base');

            if (REAL_TOTAL.includes(stat)) {
                usedStats.push(stat + '_percent');
            }
        }

        if (op == 'max') {
            parts.push('if ('+ statStr +' > '+ value +') {return false}')
        } else if (op == 'min') {
            parts.push('if ('+ statStr +' < '+ value +') {return false}')
        }
    }
    return [parts, usedStats];
}

function getBlockCode(items) {
    let compiler = new FeatureCompiler(new CBlock(items, {noReturn: true}), []);
    compiler.prepare();
    return compiler.getCode();
}
