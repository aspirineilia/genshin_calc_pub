import { BuildData } from "./Build/Data";
import { CalcObjectArtifacts } from "./CalcObject/Artifacts";
import { CalcObjectBuffs } from "./CalcObject/Buffs";
import { CalcObjectCharacter } from "./CalcObject/Character"
import { CalcObjectEnemy } from "./CalcObject/Enemy";
import { CalcObjectFood } from "./CalcObject/Food";
import { CalcObjectReaction } from "./CalcObject/Reaction";
import { CalcObjectRotation } from "./CalcObject/Rotation";
import { CalcObjectStatic } from "./CalcObject/Static";
import { CalcObjectWeapon } from "./CalcObject/Weapon";
import { Condition } from "./Condition";
import { PRIORITIES } from "./PostEffect";
import { RotationCompiler } from "./RotationCompiler";
import { Serializer } from "./Serializer";

export const objectsNames = ['char', 'weapon', 'artifacts', 'enemy', 'buffs', 'rotation', 'food', 'reaction', 'static'];
const serializeObjectsNames = ['char', 'weapon', 'artifacts', 'enemy', 'buffs', 'rotation', 'food'];

export class CalcSet {
    constructor() {
        this.char      = new CalcObjectCharacter();
        this.weapon    = new CalcObjectWeapon();
        this.artifacts = new CalcObjectArtifacts();
        this.enemy     = new CalcObjectEnemy();
        this.buffs     = new CalcObjectBuffs();
        this.rotation  = new CalcObjectRotation();
        this.food      = new CalcObjectFood();
        this.reaction  = new CalcObjectReaction();
        this.static    = new CalcObjectStatic();
    }

    getChar() {
        return this.char;
    }

    setChar(data) {
        let commonSettings = this.getCommonSettings('char');
        this.char.set(data);

        let weapon = '';

        if (this.weapon.object) {
            weapon = this.weapon.object.weapon;
        }

        if (weapon != data.weapon) {
            this.setWeapon(DB.Weapons.get(data.weapon).getFirst())
        }

        let chars = this.buffs.getPartyChars();
        this.buffs.setPartyChars(chars.filter((id) => {return id != data.getId()}));
        this.setCharSettings(commonSettings);
    }

    setCharLevels(data) {
        this.char.setLevels(data);
    }

    setCharSkills(data) {
        this.char.setSkills(data);
    }

    setCharSettings(data) {
        this.char.setSettings(data);
        this.setCommonSettings(data);
    }

    getWeapon() {
        return this.weapon;
    }

    setWeapon(data) {
        let commonSettings = this.getCommonSettings('weapon');
        this.weapon.set(data);
        this.setWeaponSettings(commonSettings);
    }

    setWeaponLevels(data) {
        this.weapon.setLevels(data);
    }

    setWeaponSettings(data) {
        this.weapon.setSettings(data);
        this.setCommonSettings(data);
    }

    setEnemy(data) {
        this.enemy.set(data);
    }

    setEnemyLevels(data) {
        this.enemy.setLevels(data);
    }

    setEnemyResistances(data) {
        this.enemy.setResistances(data);
    }

    setEnemySettings(data) {
        this.enemy.setSettings(data);
        this.setCommonSettings(data);
    }

    getEnemy() {
        return this.enemy;
    }

    setArtifact(data) {
        this.artifacts.set(data);
    }

    replaceArtifacts(items) {
        this.artifacts.replace(items);
    }

    getArtifacts() {
        return this.artifacts.get();
    }

    getArtifactsHashList() {
        let result = [];
        let artifacts = this.getArtifacts();

        Object.keys(artifacts).forEach(function(slot) {
            let art = artifacts[slot];
            if (art) {
                result.push( art.getHash() );
            }
        });

        return result;
    }

    removeArtifact(data) {
        this.artifacts.remove(data);
    }

    clearArtifacts() {
        this.artifacts.clearArtifacts();
    }

    setArtifactsSettings(data) {
        this.artifacts.setSettings(data);
        this.setCommonSettings(data);
    }

    isEquipped(data) {
        return this.artifacts.isEquipped(data);
    }

    getBuffs() {
        return this.buffs.get();
    }

    setBuffsSettings(data) {
        this.buffs.setSettings(data);
        this.setCommonSettings(data);
    }

    modifyBuffsSettings(data) {
        let settings = this.buffs.modifySettings(data);
        this.setCommonSettings(settings);
    }

    setPartyChars(ids) {
        this.buffs.setPartyChars(ids);
    }

    getPartyChars() {
        return this.buffs.getPartyChars();
    }

    setRotation(data) {
        this.rotation.set(data);
    }

    getRotation() {
        return this.rotation.get();
    }

    setFood(type, data, level) {
        return this.food.set(type, data, level);
    }

    getFood(type) {
        return this.food.get(type);
    }

    getFoodLevel(type) {
        return this.food.getLevel(type);
    }

    hasBetaContent() {
        for (let i of objectsNames) {
            if (!this[i]) {
                continue;
            }

            if (this[i].isBeta()) {
                return true;
            }
        }

        return false;
    }

    refreshCommonSettings() {
        let allSettings = this.getSettings();

        for (let i of objectsNames) {
            if (!this[i]) {
                continue;
            }

            let settings = this[i].getSettings();
            let conditions = this.getActiveConditions(allSettings, {objects: [i]});
            Condition.setCommonValues(settings, conditions);
            this[i].setSettings(settings);
        }
    }

    getCommonSettings(object) {
        let settings = this.getSettings();
        let result = this[object].getSettings();

        for (let name of Object.keys(settings)) {
            if (/^common\./.test(name)) {
                result[name] = settings[name];
            }
        }

        return result;
    }

    setCommonSettings(data) {
        let common = [];

        for (const name of Object.keys(data)) {
            if (/^common\./.test(name)) {
                common.push(name);
            }
        }

        if (common.length == 0) {
            return;
        }

        for (let i of objectsNames) {
            if (!this[i]) {
                continue;
            }

            let settings = this[i].getSettings();

            for (const name of Object.keys(settings)) {
                if (common.includes(name)) {
                    settings[name] = data[name];
                }
            }

            this[i].setSettings(settings);
        }
    }

    getConditions(options) {
        let result = [];
        let objects = objectsNames;

        for (let i = 0; i < objects.length; ++i) {
            let name = objects[i];
            if (!this[name]) {
                continue;
            }

            if (options && options.objects && !options.objects.includes(name)) {
                continue;
            }

            result = result.concat(this[name].getConditions());
        }

        return result;
    }

    getActiveConditions(settings, options) {
        let result = [];
        let objects = objectsNames;

        for (let i = 0; i < objects.length; ++i) {
            let name = objects[i];
            if (!this[name]) {
                continue;
            }

            if (options && options.objects && !options.objects.includes(name)) {
                continue;
            }

            let conditions = this[name].getConditions();

            for (let j = 0; j < conditions.length; ++j) {
                const cond = conditions[j];

                if (cond.params.hideInactive && !cond.checkSubconditions(settings)) {
                    continue;
                }

                result.push(cond);
            }
        }

        return result;
    }

    getArtifactsConditions() {
        if (this.artifacts) {
            return this.artifacts.getConditions();
        }

        return [];
    }

    getSettings() {
        let result = {};

        let objects = objectsNames;

        for (let i = 0; i < objects.length; ++i) {
            let name = objects[i];
            if (!this[name]) {
                continue;
            }

            result = Object.assign(result, this[name].getSettings());
        }

        return result;
    }

    /* deprecated */
    getBaseStats(bonus, addSettings) {
        let result = new BuildData();
        if (bonus) {
            result.stats.concat(bonus);
        }

        result.settings.concat(this.getSettings(), addSettings);

        let objects = objectsNames;

        for (let i = 0; i < objects.length; ++i) {
            let name = objects[i];
            if (!this[name]) {
                continue;
            }

            let conditions = this[name].getConditions();
            for (let j = 0; j < conditions.length; ++j) {
                let cond = conditions[j];
                let condData = cond.getData(result.settings);

                result.stats.concat(condData.stats);
                result.settings.concat(result.settings, condData.settings);
            }
        }

        for (let i = 0; i < objects.length; ++i) {
            let name = objects[i];
            if (!this[name]) {
                continue;
            }

            let data = this[name].getStats(result.settings);

            result.stats.concat(data.stats);
            result.settings.concat(result.settings, data.settings);
        }

        // TODO fix this
        if (result.stats.get('dmg_own')) {
            result.stats.add('dmg_'+ result.settings.char_element, result.stats.get('dmg_own'));
        }

        result.multipliers = this.getMultipliers();
        result.postEffects = this.getPostEffects();

        return result;
    }

    /* deprecated */
    getBaseStatsWithSets(bonus, addSettings) {
        let result = this.getBaseStats(bonus, addSettings);
        let postEffects = this.getPostEffects();

        result.stats.applyPostEffects(result.settings, postEffects, PRIORITIES.PRE_STATS);
        return result;
    }

    getPostEffects() {
        let postEffects = [];
        let objects = objectsNames;

        for (let i = 0; i < objects.length; ++i) {
            let name = objects[i];
            if (!this[name]) continue;

            postEffects = postEffects.concat(this[name].getPostEffects());
        }

        return postEffects;
    }

    getMultipliers() {
        let result = [];
        for (let name of objectsNames) {
            if (!this[name]) continue;
            result = result.concat(this[name].getMultipliers());
        }

        result = result.concat(DB.CalcData.Multipliers);

        return result;
    }

    /* deprecated */
    getStats(bonus, addSettings) {
        return this.getBaseStats(bonus, addSettings);
    }

    getBuildData(bonus, addSettings) {
        let result = this.getBaseStats(bonus, addSettings);
        result.stats.processPercent();
        return result;
    }

    calcFeatures(rotation) {
        let data = this.getBuildData();
        let result = this.getFeatures(data, rotation);

        return result;
    }

    getFeaturesList(opts) {
        let result = [];
        opts = Object.assign({}, opts)

        for (let name of objectsNames) {
            if (!this[name]) {
                continue;
            }

            let features;
            if (name == 'rotation') {
                if (!opts.ignoreRotation) {
                    let compiled = this.compileRotation();
                    if (compiled) {
                        features = [compiled];
                    }
                }
            } else {
                features = this[name].getFeatures();
            }

            if (!features) {
                continue;
            }

            result = result.concat(features);
        }

        return result;
    }

    compileRotation() {
        let compiler = new RotationCompiler(this, this.getRotation());
        return compiler.compile();
    }

    getFeaturesHash(data, opts) {
        opts = Object.assign({}, opts);
        let result = {};

        for (let feat of this.getFeaturesList()) {
            if (data && !feat.checkConditions(data)) {
                continue;
            }

            if (opts.checkCallback && !opts.checkCallback(feat)) {
                continue;
            }

            result[feat.getName()] = feat;
        }

        return result;
    }

    getFeatures(data) {
        let result = {};

        for (let feat of this.getFeaturesList()) {
            result = Object.assign(result, feat.getResult(data));
        }

        // for (let feat of DB.Reactions) {
        //     result = Object.assign(result, feat.getResult(data));
        // }

        return result;
    }

    getFeaturesNames() {
        let result = {};
        let data = this.getStats();
        let features = this.getFeaturesList();

        for (let i = 0; i < features.length; ++i) {
            const feat = features[i];
            Object.assign(result, feat.getFeatureNamesHash(data.stats, data.settings));
        }

        return result;
    }

    getFeatureResultByName(name) {
        let feature = this.getFeatureByName(name);
        if (!feature) {
            return;
        }

        let data = this.getBuildData();
        return feature.getResult(data)[name];
    }

    getFeatureByName(name, buildData) {
        if (!name) { return null }

        buildData ||= this.getBuildData();

        for (let feat of this.getFeaturesList()) {
            if (!feat.isActive(buildData)) { continue }

            if (name == feat.getName()) {
                return feat;
            }
        }

        return null;
    }

    getAllFeaturesByName(name, opts) {
        if (!name) { return [] }

        let result = [];
        for (let feat of this.getFeaturesList(opts)) {
            if (name == feat.getName()) {
                result.push(feat);
            }
        }

        return result;
    }

    clone() {
        return CalcSet.deserialize(this.serialize());
    }

    cloneWithArtifactSettings() {
        let build = CalcSet.deserialize(this.serialize());
        build.artifacts.modifySettings(this.artifacts.getSettings());
        return build;
    }

    getHash() {
        return Serializer.pack(this);
    }

    serialize() {
        let result = [1];

        // get user defined settings
        let settings = this.getSettings();

        // get condition defined settings
        for (let name of objectsNames) {
            if (!this[name]) continue;

            for (let cond of this[name].getConditions()) {
                let condData = cond.getData(settings);
                Object.assign(settings, condData.settings);
            }
        }

        for (let i of serializeObjectsNames) {
            if (!this[i]) {
                return null;
            }

            let part = this[i].serialize(settings);
            if (!part) {
                return null;
            }

            result = result.concat(part);
        }

        return result;
    }

    static deserialize(input) {
        let version = input.shift();
        let result = null;

        if (version == 1) {
            result = new CalcSet();

            result.char = CalcObjectCharacter.deserialize(input);
            if (!result.char) return null;

            result.weapon = CalcObjectWeapon.deserialize(input);
            if (!result.weapon) return null;

            result.artifacts = CalcObjectArtifacts.deserialize(input);
            if (!result.artifacts) return null;

            result.enemy = CalcObjectEnemy.deserialize(input);
            if (!result.enemy) return null;

            result.buffs = CalcObjectBuffs.deserialize(input);
            if (!result.buffs) return null;

            result.rotation = CalcObjectRotation.deserialize(input);
            if (!result.rotation) return null;

            result.food = CalcObjectFood.deserialize(input);
            if (!result.food) return null;
        }

        return result;
    }
}
