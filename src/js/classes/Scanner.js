import { createWorker } from 'tesseract.js';
import { ScannerImagePalette } from './Scanner/Image/Palette';

const DEFAULT_WIDTH = 491;
const DEFAULT_HEARER_HEIGHT = 58;

export class Scanner {
    constructor(lang) {
        this.lang    = lang;
        this.palette = new ScannerImagePalette();
    }

    process(img, opts) {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
        }

        this.progressCallback = opts.progressCallback;
        this.resultCallback = opts.resultCallback;
        this.debug = opts.debug;
        this.result = {};
        this.progress = {};

        this.canvas.width = img.width;
        this.canvas.height = img.height;

        this.ctx = this.canvas.getContext("2d");
        this.ctx.drawImage(img, 0, 0);

        const data = this.getBounds();

        if (data) {
            this.result.numStats = data.numStats;

            this.recognize(data.bounds)
        } else {
            if (this.resultCallback) {
                this.resultCallback();
            }
        }

        if (this.debug == 1) {
            document.getElementById('img_preview').append(this.canvas);
        }
    }

    async recognize(bounds) {
        const that = this;

        if (!this.worker) {
            this.worker = createWorker({
                logger: function(data) {
                    that.setProgress(data);
                },
            });

            await this.worker.load();
            await this.worker.loadLanguage(that.lang);
            await this.worker.initialize(that.lang);
        }

        for (const key of Object.keys(bounds)) {
            let coords = bounds[key].coords;

            var p = this.ctx.getImageData(coords[0], coords[1], coords[2] - coords[0]+1, coords[3] - coords[1]+1);
            let c = this.imageDataToBlob(p, bounds[key].filterFunc);

            if (this.debug == 2) {
                c.id = key;
                document.getElementById('img_preview').append(c);
            }

            this.currentKey = key;
            const result = await this.worker.recognize(c);
            this.result[key] = result.data.text;
        }

        if (this.debug == 1) {
            for (const key of Object.keys(bounds)) {
                let coords = bounds[key].coords;

                this.ctx.rect(coords[0], coords[1], coords[2] - coords[0]+1, coords[3] - coords[1]+1);
                this.ctx.stroke();
            }
        }

        this.processResult();
    }

    getBounds() {
        const width  = this.canvas.width;
        const height = this.canvas.height;

        let scale  = width / DEFAULT_WIDTH;
        let result = {};
        let top    = Math.floor(DEFAULT_HEARER_HEIGHT * scale);

        result.bounds = {
            slot: {
                filterFunc: this.palette.getMatcherNotWhite(),
                coords : [
                    Math.round(15 * scale),  top + Math.round(10 * scale),
                    Math.round(width * 0.6), top + Math.round(45 * scale),
                ],
            },
            mainName: {
                filterFunc: this.palette.getMatcherTextMainStat(),
                coords : [
                    Math.round(15 * scale),  top + Math.round(90 * scale),
                    Math.round(width * 0.55), top + Math.round(125 * scale),
                ],
            },
            mainVal: {
                filterFunc: this.palette.getMatcherNotWhite(),
                coords : [
                    Math.round(15 * scale),  top + Math.round(120 * scale),
                    Math.round(width * 0.55), top + Math.round(172 * scale),
                ],
            },
            // stars: [
            //     Math.round(15 * scale),  top + Math.round(175 * scale),
            //     Math.round(210 * scale), top + Math.round(215 * scale),
            // ],
            level: {
                filterFunc: this.palette.getMatcherTextLevel(),
                coords : [
                    Math.round(20 * scale), top + Math.round(245 * scale),
                    Math.round(90 * scale), top + Math.round(285 * scale),
                ],
            },
            dots: {
                filterFunc: this.palette.getMatcherWhite(),
                coords : [
                    Math.round(30 * scale), top + Math.round(297 * scale),
                    Math.round(48 * scale), top + Math.min(height, Math.round(453 * scale)),
                ],
            },
            crafted: {
                // filterFunc: this.palette.getMatcherWhite(),
                coords : [
                    Math.round(10 * scale), top + Math.round(215 * scale),
                    Math.round(48 * scale), top + Math.min(height, Math.round(285 * scale)),
                ],
            },
        };

        top += this.getSanctifierBarHeight(result.bounds.crafted.coords);

        result.bounds.level = {
            filterFunc: this.palette.getMatcherTextLevel(),
            coords : [
                Math.round(20 * scale), top + Math.round(245 * scale),
                Math.round(90 * scale), top + Math.round(285 * scale),
            ],
        };
        result.bounds.dots = {
            filterFunc: this.palette.getMatcherWhite(),
            coords : [
                Math.round(30 * scale), top + Math.round(296 * scale),
                Math.round(48 * scale), top + Math.min(height, Math.round(452 * scale)),
            ],
        };

        result.numStats = this.getNumStats(result.bounds.dots.coords);
        delete result.bounds.dots;

        result.bounds.stats = {
            // filterFunc: this.palette.getMatcherWhite(),
            coords : [
                Math.round(45 * scale), top + Math.round(297 * scale),
                width - 10*scale,       top + Math.min(height, Math.round((297 + (39* result.numStats)) * scale)),
            ],
        };

        result.bounds.set = {
            // filterFunc: this.palette.getMatcherWhite(),
            coords : [
                Math.round(15 * scale), top + Math.round((297 + (39* result.numStats)) * scale),
                width - 10*scale,       top + Math.min(height, Math.round((297 + (39*( result.numStats+1)+2)) * scale)),
            ],
        };

        result.bounds.set2 = {
            // filterFunc: this.palette.getMatcherWhite(),
            coords : [
                Math.round(15 * scale), top + Math.round((297 + (39* result.numStats)) * scale),
                width - 10*scale,       top + Math.min(height, Math.round((297 + (39*( result.numStats+1.7)+2)) * scale)),
            ],
        };

        return result;
    }

    getSanctifierBarHeight(craftedBounds) {
        let cnt = 0;
        let height = craftedBounds[3] - craftedBounds[1];

        for (let y = 0; y < height; ++y) {
            let p = this.ctx.getImageData(
                craftedBounds[0], craftedBounds[1]+y,
                craftedBounds[0], craftedBounds[1]+y+1,
            );

            if (this.palette.isCraftedColor(p.data.slice(0, 3))) {
                ++cnt;
            } else if (cnt > 0) {
                break;
            }
        }

        if (cnt > 10) return cnt;
        return 0;
    }

    getNumStats(bound) {
        let width = bound[2] - bound[0];
        let height = Math.round((bound[3] - bound[1]) / 4);
        let count = 0;

        let isStatEmptyPixel = this.palette.getMatcherEmptyPixel();

        loopX: for (let i=0; i < 4; ++i) {
            let top = i * height;
            let bottom = (i+1)*height;

            for (let x = 0; x < width; ++x) {
                for (let y = 0; y < 3; ++y) {
                    var p1 = this.ctx.getImageData(bound[0] + x, bound[1] + top + y,    1, 1).data;
                    var p2 = this.ctx.getImageData(bound[0] + x, bound[1] + bottom - y, 1, 1).data;

                    if (isStatEmptyPixel(p1[0], p1[1], p1[2]) && isStatEmptyPixel(p2[0], p2[1], p2[2])) {
                    } else {
                        break loopX;
                    }
                }
            }

            for (let x = 0; x < 3; ++x) {
                for (let y = 0; y < height; ++y) {
                    var p1 = this.ctx.getImageData(bound[0] + x,         bound[1] + top + y, 1, 1).data;
                    var p2 = this.ctx.getImageData(bound[0] + width - x, bound[1] + top + y, 1, 1).data;

                    if (isStatEmptyPixel(p1[0], p1[1], p1[2]) && isStatEmptyPixel(p2[0], p2[1], p2[2])) {
                    } else {
                        break loopX;
                    }
                }
            }

            ++count;
        }

        return count;
    }

    setProgress(data) {
        let key = this.currentKey;
        if (!this.progressCallback) return;

        if (!this.progress[key]) {
            this.progress[key] = [];
        }

        if (data.status == 'loading tesseract core') {
            this.progress[key][0] = data.progress;
        } else if (data.status == 'initialized tesseract') {
            this.progress[key][1] = data.progress;
        } else if (data.status == 'loaded language traineddata') {
            this.progress[key][2] = data.progress;
        } else if (data.status == 'initialized api') {
            this.progress[key][3] = data.progress;
        } else if (data.status == 'recognizing text') {
            this.progress[key][4] = data.progress * 100;
        }

        let sum = 0;
        for (const k of Object.keys(this.progress)) {
            for (let i = 0; i <= 4; ++i) {
                sum += this.progress[k][i] || 0;
            }
        }

        let percent = Math.min(100, Math.floor(sum * 100 / (104 * 6)));
        this.progressCallback(percent);
    }

    processResult() {
        if (this.resultCallback) {
            this.resultCallback(this.result);
        }
    }

    imageDataToBlob(imageData, colorFunc) {
        let w = imageData.width;
        let h = imageData.height;

        if (colorFunc) {
            for (let y = 0; y < h; ++y) {
                let lineOffset = y*w*4;
                for (let x = 0; x < w; ++x) {
                    let colOffset = lineOffset + x*4;

                    var r = imageData.data[colOffset];
                    var g = imageData.data[colOffset+1];
                    var b = imageData.data[colOffset+2];

                    if (colorFunc(r, g, b)) {
                        imageData.data[colOffset] = imageData.data[colOffset+1] = imageData.data[colOffset+2] = 255;
                    } else {
                        imageData.data[colOffset] = imageData.data[colOffset+1] = imageData.data[colOffset+2] = 0;
                    }
                }
            }
        }

        let canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        let ctx = canvas.getContext("2d");
        ctx.putImageData(imageData, 0, 0);

        var image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }

    free() {
        if (this.worker) {
            this.worker.terminate();
        }

        this.worker = null;
    }
}
