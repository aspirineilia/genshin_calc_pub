import { CVar } from "./Types/Block";
import { CStat, CStatTotal, CVarValue } from "./Types/Item";

export class CResult {
    constructor(tree) {
        this.tree = tree;
        this.variables = [];
    }

    getUsedStats() {
        if (this.statsUsed) {
            return this.statsUsed;
        }

        this.statsUsed = {};
        this.tree.walk((item) => {
            if (item instanceof CStat) {
                for (let stat of item.getUsedStats()) {
                    this.statsUsed[stat] = (this.statsUsed[stat] || 0) + 1;
                }
            }
        });

        return this.statsUsed;
    }

    compile(opts) {
        this.getUsedStats();

        let parts = this.compileVariables(opts);
        parts.push(this.tree.compile(opts));
        console.log(parts.join(';\n'))
        return Function('stats', parts.join(';\n'));
    }

    compileVariables(opts) {
        this.replaceTotalStats();

        return this.variables.map((i) => {return i.compile(opts)});
    }

    // replaceTotalStats() {
    //     let totalStatsList = Object.keys(this.statsUsed)
    //         .filter((name) => {return this.statsUsed[name] > 1 && name.startsWith('total.')})
    //         .map((name) => {return name.replace('total.', '')});

    //     let totalItems = {};

    //     this.tree.walkReplace((item) => {
    //         if (item instanceof CStatTotal) {
    //             if (totalStatsList.includes(item.stat)) {
    //                 totalItems[item.stat] = item;
    //                 return new CVarValue({name: 'stat_total_' + item.stat});
    //             }
    //         }
    //         return item;
    //     });

    //     for (let name of totalStatsList) {
    //         this.variables.push(
    //             new CVar([totalItems[name]], {name: 'stat_total_' + name})
    //         );
    //     }
    // }
}
