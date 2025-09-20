export class ValueTable {
    /**
     * @param {Array.<number>} values
     */
    constructor(values) {
        this.values = values;
    }

     /**
     * @param {number} level
     * @returns {number}
     */
    getValue(level) {
        if (level > 0) {
            if (level > this.values.length) {
                level = this.values.length;
            }
            return this.values[level - 1];
        }

        return 0;
    }
}
