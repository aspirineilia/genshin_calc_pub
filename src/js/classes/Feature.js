const MAX_LEVEL = 110;

export class Feature {
    constructor(params) {
        this.params = params;
        let category = params.category || '';
    }

    getName() {
        return '';
    }

    getCategory() {
        return this.params.category || '';
    }

    getResult() {
        return {};
    }

    getFeatureNamesHash(allStats, settings) {
        return this.getResult(allStats, settings);
    }

    checkConditions(settings) {
        let conditions = this.params.conditions;
        if (!conditions) {
            return true;
        }

        for (let i = 0; i < conditions.length; ++i) {
            const cond = conditions[i];
            if (!cond.isActive(settings)) {
                return false;
            }
        }

        return true;
    }

    getSettingName() {
        return this.params.settingName || '';
    }

    isRotation() {
        return false;
    }

    canReact() {
        return !this.params.cannotReact;
    }

    atkPercent(allStats, settings) {
        return allStats.get('atk_percent');
    }

    atkTotal(allStats, settings) {
        let base    = allStats.get('atk_base');
        let percent = this.atkPercent(allStats, settings) / 100;
        let flat    = allStats.get('atk');

        return base + flat + base * percent;
    }

    hpPercent(allStats, settings) {
        return allStats.get('hp_percent');
    }

    hpTotal(allStats, settings) {
        let base    = allStats.get('hp_base');
        let percent = this.hpPercent(allStats, settings) / 100;
        let flat    = allStats.get('hp');

        return base + flat + base * percent;
    }

    defPercent(allStats, settings) {
        return allStats.get('def_percent');
    }

    defTotal(allStats, settings) {
        let base    = allStats.get('def_base');
        let percent = this.defPercent(allStats, settings) / 100;
        let flat    = allStats.get('def');

        return base + flat + base * percent;
    }

    masteryTotal(allStats, settings) {
        return allStats.get('mastery_base') + allStats.get('mastery');
    }

    getDefReduce(allStats, settings) {
        return allStats.get('enemy_def_reduce') / 100;
    }

    getDefIgnore(allStats, settings) {
        return allStats.get('enemy_def_ignore') / 100;
    }

    getDefMultiplier(allStats, settings) {
        return Math.max(0, (1 - this.getDefReduce(allStats, settings)))
             * Math.max(0, (1 - this.getDefIgnore(allStats, settings)))
    }

    levelMultiplier(allStats, settings) {
        let source = settings.char_level;
        let target = settings.enemy_level;

        if (source && target) {
            if (source < 1) source = 1;
            if (target < 1) target = 1;
            if (source > MAX_LEVEL) source = MAX_LEVEL;
            if (target > MAX_LEVEL) target = MAX_LEVEL;

            return (100 + source) / (this.getDefMultiplier(allStats, settings) * (100 + target) + 100 + source);
        }

        return 1;
    }

    elementBonus(allStats, settings) {
        let element = this.getElement(allStats, settings);
        let bonus   = allStats.get('dmg_'+ element +'_base') + allStats.get('dmg_'+ element);

        return bonus;
    }

    getElement(allStats, settings) {
        let element = this.params.element || settings.dmg_element || 'phys';

        if (this.params.allow_infusion && element == 'phys') {
            element = this.getInfusionElement(allStats, settings);
        }

        return element;
    }

    getInfusionElement(allStats, settings) {
        if (settings.attack_infusion) {
            return settings.attack_infusion;
        } else {
            let priority = settings.attack_infusion_priority;
            if (priority && settings['attack_infusion_' + priority]) {
                return priority;
            }

            if (settings.attack_infusion_hydro) {
                return 'hydro';
            } else if (settings.attack_infusion_pyro) {
                return 'pyro';
            } else if (settings.attack_infusion_cryo) {
                return 'cryo';
            } else if (settings.attack_infusion_electro) {
                return 'electro';
            } else if (settings.attack_infusion_anemo) {
                return 'anemo';
            } else if (settings.attack_infusion_geo) {
                return 'geo';
            }
        }

        return 'phys';
    }

    damageBonus(allStats, settings) {
        return allStats.get('dmg_all');
    }

    damageMultiplier(allStats, settings) {
        let elemental = this.elementBonus(allStats, settings);
        let other = this.damageBonus(allStats, settings);

        return 1 + (elemental + other) / 100;
    }

    resistanceMultiplier(allStats, settings) {
        let element = this.getElement(allStats, settings);

        if (settings['enemy_immune_'+ element]) {
            return 0;
        }

        let resistance = (settings['enemy_res_'+ element] || 0) + allStats.get('enemy_res_'+ element);

        resistance = resistance/100;
        let multiplier = 1;

        if (resistance < 0) {
            multiplier = 1 - resistance / 2;
        } else if (resistance > 0.75) {
            multiplier= 1/(4*resistance + 1);
        } else {
            multiplier = 1 - resistance;
        }

        return multiplier;
    }

    getCriticalMultiplier(allStats, settings) {
        let element = this.getElement(allStats, settings);
        let base    = allStats.get('crit_dmg_base');
        let bonus   = allStats.get('crit_dmg') + allStats.get('crit_dmg_'+ element);

        return 1 + (base + bonus) / 100;
    }

    getCriticalChance(allStats, settings) {
        let value = this.getCritRateValue(allStats, settings);

        let chance = Math.max(0, Math.min(1, value / 100));
        if (settings.weapon_royal_avg_crit_rate) {
            let bonus = allStats.get('royal_crit_rate') / 100;
            if (bonus) {
                return calcRoyalCritRate(chance, bonus);
            }
        }
        return chance;
    }

    getCritRateValue(allStats, settings) {
        return allStats.get('crit_rate_base')
             + allStats.get('crit_rate')
             + allStats.get('crit_rate_enemy')
        ;
    }

    getTalentLevel(allStats, settings, customCategory) {
        let result = 0;
        let category = customCategory ? customCategory : this.getCategory();
        let settingName = '';

        if (category == 'attack') {
            settingName = 'char_skill_attack';
            result += settings['char_skill_attack_bonus'] || 0;
            result += settings['char_skill_attack_bonus_2'] || 0;
        } else if (category == 'skill') {
            settingName = 'char_skill_elemental';
            result += settings['char_skill_elemental_bonus'] || 0;
            result += settings['char_skill_elemental_bonus_2'] || 0;
        } else if (category == 'burst') {
            settingName = 'char_skill_burst';
            result += settings['char_skill_burst_bonus'] || 0;
            result += settings['char_skill_burst_bonus_2'] || 0;
        } else {
            settingName = this.getSettingName();
        }

        result += settings[settingName] || 1;

        return result;
    }

    shieldStrength(allStats, settings) {
        return allStats.get('shield_base') + allStats.get('shield');
    }

    getShieldElementBonus(allStats, settings) {
        let element = this.getElement(allStats, settings);

        if (element == 'geo') {
            return 1.5;
        } else if (element == 'shield') {
            return 1;
        } else if (element) {
            return 2.5;
        }

        return 1;
    }

    getHealingRecv(allStats, settings) {
        return allStats.get('healing_recv_base') + allStats.get('healing_recv') + allStats.get('healing_recv_party');
    }

    getHealingRecvParty(allStats, settings) {
        return allStats.get('healing_recv_party');
    }

    getBaseDmg(allStats, settings) {
        return this.atkTotal(allStats, settings);
    }

    getBaseDmgBonus(allStats, settings) {
        return allStats.get('additive_reaction_bonus_flat');
    }

    getBaseDmgMulti(allStats, settings) {
        let result = 1;

        if (this.params.baseDmgMulti) {
            let feat = this.params.baseDmgMulti.getResult(allStats, settings);

            let featName = Object.keys(feat)[0];

            if (featName) {
                result = feat[featName].normal / 100;
            }
        }

        return result;
    }

    getValue(allStats, settings) {
        let baseValue       = this.getBaseDmg(allStats, settings);
        let baseDmgBonus    = this.getBaseDmgBonus(allStats, settings);
        let baseDmgMulti    = this.getBaseDmgMulti(allStats, settings);
        let totalMultiplier = this.getValueMultiplier(allStats, settings);

        return (baseValue + baseDmgBonus) * baseDmgMulti * totalMultiplier;
    }

    getValueMultiplier(allStats, settings) {
        let result = this.damageMultiplier(allStats, settings);
        result *= this.resistanceMultiplier(allStats, settings);
        result *= this.levelMultiplier(allStats, settings);
        return result;
    }

    getAverageValue(normal, crit, chance) {
        return normal * (1 - chance) + crit * chance;
    }

    getRotationHitMiltiplier(allStats, settings) {
        return this.params.rotationHitCount || 1;
    }

    getDisplayRotationHitMiltiplier(allStats, settings) {
        return this.getRotationHitMiltiplier(allStats, settings);
    }

    getRotationHitDescription() {
        return this.params.rotationHitDescription || '';
    }

    getOptions() {
        return {};
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

    static buildDropdown(build, forRotation) {
        let result = [];
        let features;

        // if (forRotation) {
        //     features = build.getFeaturesNames(build, 1);

        //     for (const name of Object.keys(features)) {
        //         if (! DB.Features.Rotation.getByName(name)) {
        //             delete features[name];
        //         }
        //     }
        // } else {
            // let data = build.getStats();
            features = build.getFeaturesHash();
        // }

        let tree = Feature.getTree(features);

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

function calcRoyalCritRate(base, bonus) {
    if (base >= 1) {
        return 1
    }

    let s1 = Math.min(base + bonus, 1);
    let s2 = Math.min(base + 2 * bonus, 1);
    let s3 = Math.min(base + 3 * bonus, 1);
    let s4 = Math.min(base + 4 * bonus, 1);
    let s5 = Math.min(base + 5 * bonus, 1);

    let chance = -s5 / (
        base - base * s1 + s1 - base * s2 + base * s1 * s2 - s1 * s2 + s2 - base * s3 + base * s1 * s3 - s1 * s3
        + base * s2 * s3 - base * s1 * s2 * s3 + s1 * s2 * s3 - s2 * s3 + s3 - base * s4 + base * s1 * s4 - s1 * s4
        + base * s2 * s4 - base * s1 * s2 * s4 + s1 * s2 * s4 - s2 * s4 + base * s3 * s4 - base * s1 * s3 * s4 + s1 * s3 * s4
        - base * s2 * s3 * s4 + base * s1 * s2 * s3 * s4 - s1 * s2 * s3 * s4 + s2 * s3 * s4 - s3 * s4 + s4 + 4 * base * s5
        - 3 * base * s1 * s5 + 3 * s1 * s5 - 2 * base * s2 * s5 + 2 * base * s1 * s2 * s5 - 2 * s1 * s2 * s5 + 2 * s2 * s5
        - base * s3 * s5 + base * s1 * s3 * s5 - s1 * s3 * s5 + base * s2 * s3 * s5
        - base * s1 * s2 * s3 * s5 + s1 * s2 * s3 * s5 - s2 * s3 * s5 + s3 * s5 - 5 * s5 - 1
    );

    return Math.max(0, Math.min(1, chance))
}
