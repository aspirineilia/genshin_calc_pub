import { ScannerImagePalette } from "./Palette";

const MIN_BLOCK_WIDTH = 150;

export class ScannerImageInventory {
    constructor(img) {
        this.palette = new ScannerImagePalette();
        this.canvas = document.createElement('canvas');
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.drawImage(img, 0, 0);
    }

    getArtifactCanvas() {
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        let item      = this.getArtifact(imageData);

        if (item) {
            return {
                rarity: item.rarity,
                canvas: this.cropCanvas(item.bounds),
            };
        }

        return null;
    }

    cropCanvas(bounds) {
        let result = document.createElement('canvas');

        result.width = bounds.width;
        result.height = bounds.height;

        result.getContext("2d").drawImage(
            this.canvas,
            bounds.left, bounds.top, bounds.width, bounds.height,
            0, 0, bounds.width, bounds.height
        );

        return result;
    }

    getItemBounds(imageData) {
        for (let rarity = 5; rarity >= 1; --rarity) {
            let matchedCols = [];
            let colorMatcher = this.palette.getMatcherRarity(rarity);

            for (let x = imageData.width - 1; x >= 0; --x) {
                let count = 0;
                let lastY = -1;
                let topY  = -1;

                for (let y = 0; y < imageData.height; ++y) {
                    let start = y * (imageData.width * 4) + x * 4;
                    let r = imageData.data[start];
                    let g = imageData.data[start + 1];
                    let b = imageData.data[start + 2];

                    if (colorMatcher(r, g, b)) {
                        if (lastY > 0 && y - lastY > 60) {
                            count = 0;
                            continue;
                        }

                        lastY = y;
                        if (topY >= 0) {
                            topY = Math.min(topY, lastY);
                        } else {
                            topY = lastY;
                        }

                        if (++count >= 10) {
                            matchedCols.push({
                                x: x,
                                topY: topY,
                            });
                            break;
                        }
                    }
                }
            }

            let topY = -1, start = -1, end = -1;

            for (const item of matchedCols) {
                let x = item.x;

                topY = topY >= 0 ? Math.min(topY, item.topY) : item.topY;

                if (start <= 0) {
                    start = x;
                    end = x;
                    continue;
                }

                if (Math.abs(x - end) > 5) {
                    if (Math.abs(start - end) >= MIN_BLOCK_WIDTH) {
                        break;
                    }

                    topY = -1, start = -1, end = -1;
                    continue;
                }

                end = x;
            }

            let width = Math.abs(start - end) + 1;

            if (topY >= 0 && width >= MIN_BLOCK_WIDTH) {
                return {
                    rarity: rarity,
                    bounds: {
                        left: Math.min(start, end),
                        top: topY,
                        width: width,
                        height: 0,
                    },
                };
            }
        }

        return null;
    }

    getArtifact(imageData) {
        let result = this.getItemBounds(imageData);

        if (result) {
            result.bounds.height = Math.floor(result.bounds.width * 1.3);
        }

        return result;
    }
}
