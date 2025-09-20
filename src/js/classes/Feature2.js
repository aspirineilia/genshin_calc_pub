import { makeStatItem } from "./Feature2/Compile/Helpers";
import { getUsedStats } from "./Feature2/Compile/Stats";
import { CCritDmg, CCritRate } from "./Feature2/Compile/Types/Damage";
import { CConst } from "./Feature2/Compile/Types/Item";
import { FeatureCompiler } from "./Feature2/Compiler";
import { FeatureResult } from "./FeatureResult";

if (process.env.NODE_ENV !== 'production') {
    var FIELD_NAMES = [
        'name', 'category', 'element', 'damageType', 'multipliers', 'condition', 'tags',
        'cannotReact', 'format', 'digits', 'postEffect', 'items', 'isChild', 'hits',
        'allowInfusion', 'icon', 'stat', 'penalty',
        'damageBonuses', 'critRateBonuses', 'critDamageBonuses',
        'subtractBoL', 'partyHeal', 'noSelfHeal',
        'rotationHitCount', 'rotationHitDescription',
    ];
}

export class Feature2 {
    constructor(params) {
        if (process.env.NODE_ENV !== 'production') {
            for (let name of Object.keys(params)) {
                if (!FIELD_NAMES.includes(name)) {
                    console.error(`Unknown param '${name} in FeatureDamage contructor`);
                }
            }
        }

        this.name = params.name || (params.multipliers && params.multipliers.length > 0 ? params.multipliers[0].getName() : '');
        this.isChild = params.isChild;
        this.hits = params.hits;
        this.icon = params.icon;
        this.tags = params.tags || [];
        this.multipliers = params.multipliers || [];
        this.category = params.category;
        this.condition = params.condition;
        this.element = '';
        this.damageType = '';
        this.rotationHitDescription = params.rotationHitDescription || '';
        this.rotationHitCount = params.rotationHitCount || 1;
        this.critRateBonuses = params.critRateBonuses || [];
        this.critDamageBonuses = params.critDamageBonuses || [];
    }

    getDamageType() {
        return this.damageType;
    }

    getElement() {
        return this.element;
    }

    getName() {
        return this.category +'.'+ this.name;
    }

    getIsChild() {
        return this.isChild;
    }

    getHits() {
        return this.hits;
    }

    getTags() {
        return this.tags;
    }

    /**
     * @returns {boolean}
     */
    isRotation() {
        return false;
    }

    /**
     * @returns {boolean}
     */
    hasDetails() {
        return false;
    }

    /**
     * @returns {boolean}
     */
    canReact() {
        false;
    }

    /**
     * @returns {boolean}
     */
    usedInRotation() {
        return false;
    }

    isActive(data) {
        if (!this.condition) { return true }
        return this.condition.isActive(data.settings);
    }

    compile(data) {
        this.compiled = this.getCompiled(data);
    }

    getDisplaySettings(data) {
        return;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<FeatureMultiplier>}
     */
    getMultipliers(data) {
        let multipliers = [];
        for (let item of this.multipliers) {
            if (!item.isActive(data)) continue;
            multipliers.push(item);
        }

        for (let item of data.multipliers) {
            if (!item.isActive(data)) continue;
            if (!item.isMatchFeature(this, data)) continue;
            multipliers.push(item);
        }

        return multipliers;
    }

    getActivePostEffectsTree(data) {
        return data.getActivePostEffectsTree();
    }

    getCritRateBlock(data) {
        let items = this.getStatsCritRate(data).map((stat) => { return makeStatItem(stat, data.stats) });
        if (items.length == 0) {
            items = [new CConst({value: 0})];
        }
        return new CCritRate(items);
    }

    getCritDmgBlock(data) {
        let items = this.getStatsCritDamage(data).map((stat) => { return makeStatItem(stat, data.stats) });
        if (items.length == 0) {
            items = [new CConst({value: 0})];
        }
        return new CCritDmg(items);
    }

    getCompiled(data, opts) {
        if (this.compiled) {
            return this.compiled;
        }

        opts = Object.assign({dontProcessTree: 1}, opts);
        let tree = this.getTree(data);
        let postItems = this.getActivePostEffectsTree(data);

        let compiler = new FeatureCompiler(tree, postItems);
        if (data.settings.reaction) {
            compiler.checkForReaction();
        }

        data.stats.ensure(compiler.usedStats);
        data.stats.ensure(compiler.assignedStats);
        compiler.prepare(data, opts);
        compiler.compile(opts);

        return compiler;
    }

    checkConditions(data) {
        if (!this.condition) {
            return true;
        }

        return this.condition.isActive(data.settings);
    }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    compile(data, opts) {
        let tree = this.getTree(data);
        return this.compileTree(tree, opts);
    }

    /**
     * @param {CBlock} tree
     * @param {BuildData} data
     * @returns {Function}
     */
    compileTree(root, opts) {
        opts = Object.assign({}, opts);
        return root.compile(opts);
    }

    /**
     * @param {BuildData} data
     * @returns {Object}
     */
    getResult(data) {
        if (!this.checkConditions(data)) {
            return {};
        }

        let compiler = this.getCompiled(data);
        let [normal, crit, average] = compiler.execute(data);

        return {
            [this.getName()]: new FeatureResult({
                icon: this.icon || this.getElement(data),
                normal: normal,
                crit: crit,
                average: average,
                isReacted: compiler.isReacted,
                format: this.format,
                digits: this.digits,
                damageType: this.damageType,
                noCritValues: this.noCritValues,
            }),
        };
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getUsedStats(data) {
        let tree = this.getTree(data);
        let postItems = data.getActivePostEffectsTree();
        let opts = {};

        let compiler = new FeatureCompiler(tree, postItems);
        data.stats.ensure(compiler.usedStats);
        compiler.prepare(data, opts);

        return getUsedStats(compiler.processed);
    }

    getRotationHitMiltiplier(data) {
        return this.rotationHitCount;
    }

    getDisplayRotationHitMiltiplier(data) {
        return this.getRotationHitMiltiplier(data);
    }

    getRotationHitDescription() {
        return this.rotationHitDescription;
    }

    static getTree(items) {
        let tree = {};

        for (const name of Object.keys(items)) {
            let parts = name.split('.');
            let first = parts.shift();
            let remain = parts.join('.');

            if (tree[first] === undefined) {
                tree[first] = {};
            }

            tree[first][remain] = items[name];
        }

        return tree;
    }

    static buildDropdown(build, opts) {
        opts = Object.assign({}, opts);

        let result = [];
        let features = build.getFeaturesHash(build.getBuildData(), opts);
        let tree = Feature2.getTree(features);

        for (let section of Object.keys(tree)) {
            result.push({
                isCaption: true,
                value: 'section_' + section,
                text: UI.Lang.get('feature_section.'+ section),
            });

            for (let feature of Object.keys(tree[section])) {
                let featureData = tree[section][feature];

                if (featureData.hidden) {
                    continue;
                }

                let value = section +'.'+ feature;
                let title = 'feature_'+ value;

                if (featureData.title) {
                    title = featureData.title;
                }

                title = UI.Lang.get(title)
                if (featureData.isChild) {
                    title = '• '+ title;
                }

                result.push({
                    value: value,
                    text: title,
                    isSubitem: true,
                    isChild: !!featureData.isChild,
                });
            }
        }

        return result;
    }
}
