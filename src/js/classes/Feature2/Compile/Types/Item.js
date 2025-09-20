import { CItem } from "../Types";
import { CMulti, CSum, CSumPlusOne } from "./Block";

export class CConst extends CItem {
    getType() {return 'item_const'}

    getSignature() {
        return '(const:' + this.value + ')';
    }
}

export class CStat extends CItem {
    getType() {return 'item_stat'}

    compile(opts) {
        return 'stats.' + this.stat;
    }

    process(opts) {
        if (opts.staticStats && opts.staticStats.includes(this.stat)) {
            return new CConst({value: this.value, comment: this.stat});
        }

        return super.process();
    }

    getUsedStats() {
        return [this.stat];
    }

    getSignature() {
        return '(stat:' + this.stat + ')';
    }
}

export class CStatTotal extends CStat {
    getType() {return 'item_stat_total'}

    getUsedStats() {
        return [this.stat, this.stat + '_base', this.stat + '_percent'];
    }

    process(opts) {
        let block = new CSum([
            new CMulti([
                new CStat({stat: this.statBaseName(), value: this.baseBalue}),
                new CSumPlusOne([
                    new CStat({stat: this.statPercentName(), value: this.percentValue}),
                ], {comment: this.stat + '_percent', percent: true}),
            ]),
            new CStat({stat: this.statFlatName(), value: this.flatValue}),
        ], {comment: this.stat});

        return block.process(opts);
    }

    statBaseName() {
        return this.replaceName(this.stat + '_base');
    }

    statPercentName() {
        return this.replaceName(this.stat + '_percent');
    }

    statFlatName() {
        return this.replaceName(this.stat);
    }

    replaceName(stat) {
        if (this.replace && this.replace[stat]) {
            return this.replace[stat];
        }
        return stat;
    }

    compile(opts) {
        return `(stats.${this.statBaseName()} * (1 + stats.${this.statPercentName()}) + stats.${this.statFlatName()})`;
    }
}

export class CVarValue extends CItem {
    constructor(params) {
        params.name = params.ref.name;
        delete params.ref;
        super(params);
    }

    getType() {return 'variable_get'}
    isVariableGet() {return true}

    compile(opts) {
        return this.name;
    }

    getSignature() {
        return '(var_value:' + this.name + ')';
    }
}
