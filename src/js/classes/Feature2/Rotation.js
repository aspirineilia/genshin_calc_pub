import { Feature2 } from "../Feature2";
import { FeatureResult } from "../FeatureResult";
import { CBlock } from "./Compile/Types";
import { Feature2RotationTree, getReactionName } from "./Rotation/Tree";
// import { getUsedStats } from "./Compile/Stats";


export class FeatureRotation extends Feature2 {
    constructor(params) {
        super(params);
        this.items = params.items;
    }

    getName() { return 'rotation.total' }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    getTree(data, opts) {
        let tree = new Feature2RotationTree(this.items, opts);
        return tree.getTree(data);
    }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    compile(data, opts) {
        let tree = this.getTree(data, opts);
        return this.compileTree(tree, opts);
    }

    /**
     * @param {CBlock} tree
     * @returns {Function}
     */
    compileTree(root, opts) {
        opts = Object.assign({}, opts);
        return root.compile(opts);
    }

    getResult(data) {
        if (!this.checkConditions(data)) {
            return {};
        }

        let compiler = this.getCompiled(data);
        let [normal, crit, average] = compiler.execute(data);

        let element = this.getElement(data);
        if (data.settings && data.settings.rotation_include) {
            element = data.settings.rotation_include;
        }

        return {
            [this.getName()]: new FeatureResult({
                icon: element,
                normal: normal,
                crit: crit,
                average: average,
            }),
        };
    }

    getResultForEditor(build) {
        let buildData = build.getBuildData();
        return this.processBlock(this.items, buildData);
    }

    processBlock(items, buildData) {
        let result = [];

        for (let item of items) {
            if (item.type == 'feature') {
                buildData.settings.reaction = getReactionName(item);
                let activeFeature = getActiveFeature(item.feature, buildData);
                if (activeFeature) {
                    let featureResult = activeFeature.getResult(buildData)[activeFeature.getName()];
                    result.push({
                        result: featureResult,
                        count: item.count,
                        subLine: featureSubline(item.feature, buildData),
                    });
                } else {
                    result.push({});
                }
            } else if (item.type == 'condition') {
                if (item.settings) { buildData.addSettings(item.settings) }
                if (item.stats) { buildData.addStats(item.stats) }

                // TODO
                if (item.postEffects && item.postEffects.length) { buildData.postEffects = item.postEffects }
                if (item.multipliers && item.multipliers.length) { buildData.multipliers = item.multipliers }

            } else if (item.type == 'repeat') {
                let blockBuildData = buildData.clone();
                blockBuildData.addSettings({inside_rotation_block: 1});
                let subItems = this.processBlock(item.items, blockBuildData)
                result = result.concat(subItems);
            } else if (item.type == 'uptime') {
                let blockBuildData = buildData.clone();
                blockBuildData.addSettings({inside_rotation_block: 1});

                let blockBuildData2 = blockBuildData.clone();

                let subItems1 = this.processBlock(item.items, blockBuildData);
                let subItems2 = this.processBlock(item.conditions.concat(item.items), blockBuildData2);
                let percent = item.percent / 100;
                let rev_recent = 1 - percent;

                for (let i = 0; i < subItems1.length; ++i) {
                    let item1 = subItems1[i].result;
                    let item2 = subItems2[i].result;

                    if (!item1 && !item2) continue;  // both invalid

                    if (!item2) {
                        item2 = {normal: 0, crit: 0, average: 0};
                    } else if (!item1) {
                        subItems1[i] = Object.assign({}, subItems2[i]);
                        item1 = subItems1[i].result = {normal: 0, crit: 0, average: 0};
                    }

                    for (let key of ['normal', 'crit', 'average']) {
                        item1[key] = item1[key] * rev_recent + item2[key] * percent;
                    }
                }

                result = result.concat(subItems1);
            } else if (item.type == 'invalid') {
                result.push({});
            }
        }

        return result;
    }

    getDisplaySettings(data) {
        let elements = {};
        let damageTypes = {};

        let result = [{
            settings: {rotation_include: null},
            setTotal: 1,
            icon: 'multi',
        }];

        function processBlock(items, data, elements, damageTypes) {
            let buildData = data.clone();

            for (let item of items) {
                if (item.type == 'feature') {
                    let activeFeature = getActiveFeature(item.feature, buildData);
                    if (activeFeature) {
                        elements[activeFeature.getElement(buildData)] = 1;
                        damageTypes[activeFeature.getDamageType()] = 1;
                    }
                } else if (item.type == 'condition') {
                    if (item.settings) { buildData.addSettings(item.settings) }
                    if (item.stats) { buildData.addStats(item.stats) }
                } else if (item.type == 'repeat') {
                    processBlock(item.items, buildData, elements, damageTypes);
                } else if (item.type == 'uptime') {
                    processBlock(item.items, buildData, elements, damageTypes);
                    processBlock([...item.conditions, ...item.items], buildData, elements, damageTypes);
                }
            }
        }

        processBlock(this.items, data, elements, damageTypes);

        for (let element of Object.keys(elements)) {
            result.push({
                id: 'rotation.total_' + element,
                title: 'rotation.' + element,
                isChild: true,
                settings: {rotation_include: element},
                getTotal: 1,
            });
        }

        for (let datageType of Object.keys(damageTypes)) {
            result.push({
                id: 'rotation.total_' + datageType,
                title: 'rotation.' + datageType,
                icon: 'multi',
                isChild: true,
                settings: {rotation_include: datageType},
                getTotal: 1,
            });
        }

        return result;
    }
}

function getActiveFeature(features, data) {
    features = Array.isArray(features) ? features : [features];

    for (let feature of features) {
        if (feature.isActive(data) && feature.usedInRotation()) {
            return feature;
        }
    }
}

function featureSubline(features, data) {
    let feature = getActiveFeature(features, data);
    let descr = feature.getRotationHitDescription(data);

    if (descr) {
        return {
            descr: 'talent_descr.' + descr,
            value: feature.getDisplayRotationHitMiltiplier(data),
        };
    }
}
