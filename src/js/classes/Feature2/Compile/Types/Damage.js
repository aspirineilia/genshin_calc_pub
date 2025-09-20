import { makeRoyalAverageCrit } from "../Helpers";
import { CBlock, CReturn } from "../Types";
import { CMulti, CSubtract, CSum, CSumPlusOne, CVar } from "./Block";
import { CConst, CVarValue } from "./Item";

export class CCritRate extends CSum {
    compile(opts) {
        let result = super.compile(opts);
        return `Math.max(0, Math.min(1, ${result}))`;
    }
}

export class CCritDmg extends CSumPlusOne {}

export class CDamageResult extends CBlock {
    getType() {return 'damage_result'}
    isCollapsable() {return false}


    compile(opts) {
        return '[' + this.compileChildrens(opts).join(', ') + ']';
    }

    getSignature() { return null }
}

export class CHeal extends CMulti {
    getType() {return 'heal_result'}
    isCollapsable() {return false}

    /**
     * @returns {CBlock}
     */
    makeResult(opts) {
        let varNormal = new CVar([new CMulti(this.items)], {name: 'normal'});

        return new CReturn([
            varNormal,
            new CDamageResult([
                new CVarValue({ref: varNormal}),
                new CVarValue({ref: varNormal}),
                new CVarValue({ref: varNormal}),
            ]),
        ]);
    }
}

export class CShield extends CMulti {
    getType() {return 'shield_result'}
    isCollapsable() {return false}

    /**
     * @returns {CBlock}
     */
    makeResult(opts) {
        let varNormal = new CVar([new CMulti(this.items)], {name: 'normal'});

        return new CReturn([
            varNormal,
            new CDamageResult([
                new CVarValue({ref: varNormal}),
                new CVarValue({ref: varNormal}),
                new CVarValue({ref: varNormal}),
            ]),
        ]);
    }
}

export class CDamage extends CMulti {
    getType() {return 'damage_result'}

    /**
     * @returns {Array.<CBlock>}
     */
    treeBlockFields() {
        let result = super.treeBlockFields();
        if (this.critRate) result.push(this.critRate.items);
        if (this.critDmg) result.push(this.critDmg.items);
        if (this.royalCrit) result.push([this.royalCrit]);
        return result;
    }

    /**
     * @returns {CBlock}
     */
    makeResult(opts) {
        opts = Object.assign({}, opts);

        let varNormal = new CVar([new CMulti(this.items)], {name: 'normal'});
        let varChance = new CVar([this.critRate], {name: 'crit_rate'});
        let varCrit = new CVar([
            new CMulti([
                new CVarValue({ref: varNormal}),
                this.critDmg,
            ]),
        ], {name: 'crit_dmg'});

        let varsBlock = [];
        if (this.royalCrit) {
            [varsBlock, varChance] = makeRoyalAverageCrit(varChance, this.royalCrit);
        }

        return new CReturn([
            varNormal,
            ...varsBlock,
            varChance,
            varCrit,
            new CDamageResult([
                new CVarValue({ref: varNormal}),
                new CVarValue({ref: varCrit}),
                new CSum([
                    new CMulti([
                        new CVarValue({ref: varNormal}),
                        new CSubtract([
                            new CConst({value: 1}),
                            new CVarValue({ref: varChance}),
                        ]),
                    ]),
                    new CMulti([
                        new CVarValue({ref: varCrit}),
                        new CVarValue({ref: varChance}),
                    ]),
                ]),
            ]),
        ]);
    }
}

export class CDamageRotation extends CMulti {
    getType() {return 'damage_rotation_result'}

    /**
     * @returns {CBlock}
     */
    makeResult(opts) {
        opts = Object.assign({}, opts);

        return new CReturn([
            ...this.items,
            new CDamageResult(this.vars),
        ]);
    }
}

export class CStaticValue extends CHeal {
    getType() {return 'static_result'}
}
