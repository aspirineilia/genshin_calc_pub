const palette = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAACCAIAAAAfCIEKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAArSURBVBhXASAA3/8BcneLuBnnJ/BZUNYVGxNSAOzl2MjIyNzc3IyMjP///wEYEo+x+R/FAAAAAElFTkSuQmCC';
const colors = ['rarity1', 'rarity2', 'rarity3', 'rarity4', 'rarity5', 'level', 'c200', 'c220', 'main'];

let colorsValues = {};
// Color profiles broke image colors. Palette should use same profile
let image = new Image();
image.onload = function() {
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    let data = ctx.getImageData(0, 0, image.width, image.height).data;

    for (let i = 0; i < colors.length; ++i) {
        let name = colors[i];
        colorsValues[name] = [data[i*4], data[i*4+1], data[i*4+2]];
    }
};
image.src = palette;

export class ScannerImagePalette {
    constructor() {
        this.colors = colorsValues;
    }

    getColor(index) {
        return this.colors[index];
    }

    getColorRarity(index) {
        return this.getColor('rarity'+ index);
    }

    getMatcherRarity(index) {
        let diff  = 20;
        let color = this.getColorRarity(index);

        let result;
        if (color) {
            result = function(r, g, b) {
                return Math.abs(r - color[0]) < diff && Math.abs(g - color[1]) < diff && Math.abs(b - color[2]) < diff;
            }
        } else {
            result = function() {return 0};
        }

        return result;
    }

    getMatcherEmptyPixel() {
        let color = this.getColor('c200');

        return function(r, g, b) {
            return r > color[0] && g > color[1] && b > color[2];
        };
    }

    getMatcherWhite() {
        let color = this.getColor('c200');

        return function(r, g, b) {
            return r >= color[0] && g >= color[1] && b >= color[2];
        };
    }

    getMatcherNotWhite() {
        let color = this.getColor('c200');

        return function(r, g, b) {
            return r < color[0] && g < color[1] && b < color[2];
        };
    }

    getMatcherTextLevel() {
        const c1 = this.getColor('level');
        const c2 = this.getColor('c200');

        return function (r, g, b) {
            if (r < 120 || g < 120 || b < 120) return 1;
            if (r > g || g >= b && g < 220) return 1;

            let res = Math.abs(r-c1[0]) <= 5 && Math.abs(g-c1[1]) <= 5 && Math.abs(b-c1[2]) <= 5;
            if (res) return 1;

            return 0;
        }
    }

    getMatcherTextMainStat() {
        const c = this.getColor('main');

        return function isTextMainStat(r, g, b) {
            // return Math.abs(r-190) > 20 && Math.abs(g-174) > 20 && Math.abs(b-169) > 20;
            return r < c[0] || g < c[1] || b < c[2];
        }
    }

    isCraftedColor(data) {
        return Math.abs(220 - data[0]) <= 15 && Math.abs(192 - data[1]) <= 15 && Math.abs(255 - data[2]) <= 15;
    }
}


