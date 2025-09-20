import { getUsedStats } from "./Stats";

export class CBlock {
    constructor(items, props) {
        this.items = items || [];
        if (props) Object.assign(this, props);
    }

    getType() {return 'block'}
    hasItems() {return true}

    compileChildrens(opts) {
        return this.items.filter((i) => {return !i.isBlank()})
            .map((i) => {return i.compile(opts)});
    }

    isBlank() {
        for (let item of this.items) {
            if (!item.isBlank()) return false;
        }
        return true;
    }

    isCollapsable() {return true}
    isVariableSet() {return false}
    isVariableGet() {return false}

    process(opts) {
        return this;
    }

    compile(opts) {
        let parts = this.compileChildrens(opts);
        return parts.join(';\n');
    }

    execute(data, opts) {
        data.stats.ensure(getUsedStats(this));
        let func = Function('stats', 'return ' + this.compile(opts));
        return func(data.stats);
    }

    getSignature() {
        return '('+ (this.isCollapsable() ? '' : '!') + this.getType() +':'+ this.items.map((i) => {return i.getSignature()}).join(',') +')';
    }

    /**
     * @returns {Array.<CBlock>}
     */
    treeBlockFields() {
        return [this.items];
    }

    makeResult() {
        if (this.noReturn) return this;
        return new CReturn([this]);
    }

    /**
     * @param {Function} callback
     */
    walk(callback, stopCallback) {
        for (let block of this.treeBlockFields()) {
            for (let item of block) {
                if (stopCallback && stopCallback(item)) continue;
                callback(item);
            }

            for (let item of block) {
                if (stopCallback && stopCallback(item)) continue;
                if (item.walk) {
                    item.walk(callback, stopCallback);
                }
            }
        }
    }

    /**
     * @param {Function} callback
     */
    walkReplace(callback) {
        for (let block of this.treeBlockFields()) {
            let items = [];

            for (let item of block) {
                let res = callback(item);
                if (res) {
                    items.push(res);
                }
            }

            block.splice(0, block.length, ...items);

            for (let item of block) {
                if (item.walkReplace) {
                    item.walkReplace(callback);
                }
            }
        }
    }

    getInfoProperties() {
        let result = {};
        for (let name of Object.keys(this)) {
            if (typeof this[name] != 'object') {
                result[name] = this[name];
            }
        }
        return result;
    }
}

export class CReturn extends CBlock {
    getType() {return 'block_return'}

    appendChildren() {
        let last = this.items.pop();
        for (let item of arguments) {
            this.items.push(item);
        }

        if (last) {
            this.items.push(last);
        }
    }

    compile(opts) {
        let parts = this.items.map((i) => {return i.compile(opts)});
        parts[parts.length - 1] = 'return ' + parts[parts.length - 1];
        return parts.join(';\n');
    }
}

export class CItem {
    constructor(props) {
        Object.assign(this, props);
    }

    getType() {return 'item'}
    hasItems() {return false}
    isVariableSet() {return false}
    isVariableGet() {return false}

    compile(opts) {
        return this.value || 0;
    }

    isBlank() {
        return this.static && this.blank;
    }

    process(opts) {
        return this;
    }

    getSignature() {
        throw `Item ${this.constructor.name} has no "getSignature" method!`;
    }
}
