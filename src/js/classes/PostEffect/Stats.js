import { makeStatItem } from "../Feature2/Compile/Helpers";
import { CMulti, CPostEffect, CSubtract, CSum, CValueAboveZero, CValueCap } from "../Feature2/Compile/Types/Block";
import { CConst } from "../Feature2/Compile/Types/Item";
import { PostEffect } from "../PostEffect";
import { isPercent } from "../Stats";

export class PostEffectStats extends PostEffect {
    getStacks(data) {
        if (!this.params.stacksSetting) {
            return 1;
        }

        return data.settings[this.params.stacksSetting] || 1;
    }

    getBaseValueTree(data, opts) {
        return makeStatItem(this.params.from, data.stats);
    }

    getPercents(data) {
        return Array.isArray(this.params.percent) ? this.params.percent : [this.params.percent];
    }

    getTree(data, opts) {
        opts = Object.assign({}, opts);

        let result = [];
        let percents = this.getPercents(data);
        let level = this.getLevel(data.settings);

        let maxValue;
        let maxValuePost;
        if (this.params.statCap) {
            maxValue = this.params.statCap.getValue(level);
        } else if (this.params.statCapPost) {
            maxValuePost = this.params.statCapPost.getTree(data)[0];
        }

        let bonus = 0;
        let bonusValue = 0;
        if (this.params.percentBonus) {
            if (!this.params.bonusCondition || this.params.bonusCondition.isActive(data.settings)) {
                let bonusLevel = data.settings.getLevel(this.params.percentBonusLevel);
                bonus = this.params.percentBonus.getValue(bonusLevel);
                if (this.params.bonusStackSettings) {
                    let stacks = data.settings[this.params.bonusStackSettings];
                    bonus *= stacks;
                }
            }
        }

        if (this.params.flatBonus) {
            if (!this.params.flatBonusCondition || this.params.flatBonusCondition.isActive(data.settings)) {
                bonusValue = this.params.flatBonus.getValue(level);
            }
        }

        for (let table of percents) {
            let value = table.getValue(level);
            let stat = table.getName();
            let statMaxValue = maxValue;

            if (isPercent(stat)) {
                value = value / 100;
                statMaxValue = statMaxValue / 100;
            }

            let base = this.getBaseValueTree(data, opts);
            if (this.params.maxBase) {
                base = new CValueCap([base], {value: new CConst({value: this.params.maxBase})})
            } else if (this.params.exceed) {
                base = new CValueAboveZero([
                    new CSubtract([base, new CConst({value: this.params.exceed})]),
                ]);
            }

            let stacks = this.getStacks(data);
            let valueConst = new CConst({value: value});
            if (stacks > 1) {
                valueConst = new CMulti([valueConst, new CConst({value: stacks, comment: 'stacks'})]);
            }

            if (bonus) {
                valueConst = new CSum([
                    valueConst,
                    new CConst({value: bonus}),
                ]);
            }

            let items = [
                new CMulti([valueConst, base]),
            ];

            if (bonusValue) {
                items = [
                    new CSum([
                        ...items,
                        new CConst({value: bonusValue}),
                    ]),
                ];
            }

            if (statMaxValue) {
                items = [new CValueCap(items, {value: new CConst({value: statMaxValue})})];
            } else if (maxValuePost) {
                items = [new CValueCap(items, {value: maxValuePost})];
            }

            result.push(new CPostEffect(items, {
                stat: stat,
                priority: this.getPriority(),
            }));
        }

        return result;
    }
}
