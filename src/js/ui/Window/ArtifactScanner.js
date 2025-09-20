import $ from "jquery";
import SimpleBar from 'simplebar';
import "../../../css/ui/Window/ArtifactScanner.css"
const levenshtein = require('js-levenshtein');

import { Artifact } from "../../classes/Artifact";
import { ArtifactWidget } from "../Wigdet/Artifact";
import { ArtifactWidgetSimilar } from "../Wigdet/Artifact/Similar";
import { Scanner } from "../../classes/Scanner";
import { Window } from "../Window"
import { Serializer } from "../../classes/Serializer";
import { ScannerTextSubstat } from "../../classes/Scanner/Text/Substat";
import { ScannerImageInventory } from "../../classes/Scanner/Image/Inventory";

export class ArtifactScanner extends Window {
    constructor() {
        super();

        this.widgetScanned = new ArtifactWidget({
            buttons: [
                {class: 'artifact-list-box-edit', title: 'tooltip.artifact_edit'},
            ],
        });
        this.widgetStorage = new ArtifactWidgetSimilar();
    }

    init(app) {
        if (this.initialized) {
            return;
        }

        super.init();

        this.app = app;
        this.root.addClass('gi-window-artifact-scanner');
        this.back.addClass('gi-window-artifact-scanner-back');

        let html = '<div class="gi-scanner-image-preview" id="img_preview">';
        html += '<img src="/images/help/scanner_'+ UI.Lang.getLang() +'.png">';
        html += '</div>';
        html += '<div class="gi-scanner-image-controls">';
        html += UI.Lang.get('scanner.paste') +'<br><input type="file" id="file" />';
        html += '<div class="gi-hr"></div>';

        html += '<div class="gi-artifact-scanner-artifact">';
        html += UI.Lang.getTalent('scanner.instruction');
        html += '</div>';
        html += '<div class="gi-hr"></div>';

        html += '<div class="gi-modal-buttons">';
        html += '<div class="gi-inputs-button modal-add"><span class="gi-inputs-button-icon button-icon-ok"></span>';
        html +=  UI.Lang.get('scanner.add_to_pool') +'</div>';
        html += '<div class="gi-inputs-button modal-update"><span class="gi-inputs-button-icon button-icon-ok"></span>';
        html +=  UI.Lang.get('scanner.update_storage') +'</div>';
        html += '<div class="gi-inputs-button modal-close"><span class="gi-inputs-button-icon button-icon-cancel"></span>';
        html +=  UI.Lang.get('modal_buttons.cancel') +'</div>';
        html += '</div>';

        html += '</div>';

        this.appendContent(html);
        this.worker = new Scanner(UI.Lang.getLang());
        this.setCaption(UI.Lang.get('modal_window.scanning_artifact'));

        this.root.find('.modal-add, .modal-update').hide();
        this.bindEvents();
    }

    show(callback, opts) {
        this.callback = callback;
        this.opts = Object.assign({}, opts);

        super.show();
    }

    hide() {
        super.hide();
        if (this.worker) {
            // this.worker.free();
        }
    }

    processImage(img) {
        const that = this;

        let debug = 0;
        let data  = new ScannerImageInventory(img);
        let croppedData = data.getArtifactCanvas();

        this.valid = false;
        this.art   = null;

        this.root.find('.modal-add, .modal-update').hide();
        this.root.find('#file').val('');

        if (!croppedData) {
            this.root.find('.gi-artifact-scanner-artifact').html( UI.Lang.get('scanner.error'));
            return;
        }

        if (debug) {
            that.root.find('.gi-scanner-image-preview').empty();
        }

        let image = new Image();
        image.onload = function() {
            let html = '<div class="gi-scanner-progress-wrapper">';
            html += '<div class="gi-scanner-progress"></div><span class="gi-scanner-progress-value">0%</span>';
            html += '</div>';

            that.root.find('.gi-artifact-scanner-artifact').html(html);

            that.worker.process(image, {
                debug: debug,
                progressCallback: function(percent) {
                    that.updateProgress(percent);
                },
                resultCallback: function(d) {
                    d.rarity = croppedData.rarity;
                    that.processResult(d);
                },
            });

            if (!debug) {
                that.root.find('.gi-scanner-image-preview').empty().append(image);
            }
        };

        image.src = croppedData.canvas.toDataURL('image/png');
    }

    updateProgress(percent) {
        this.root.find('.gi-scanner-progress-value').text(percent +'%');
        this.root.find('.gi-scanner-progress').css('width', percent +'%');
    }

    processResult(data) {
        if (!data) {
            this.root.find('.gi-artifact-scanner-artifact').html( UI.Lang.get('scanner.error'));
            return;
        }

        let result = {
            slot: this.processSlot(data),
            subStats: this.processStats(data),
        };

        result.set = this.processSetName(data, result.slot);

        if (result.slot == 'flower') {
            result.mainStat = 'hp';
        } else if (result.slot == 'plume') {
            result.mainStat = 'atk';
        } else {
            result.mainStat = this.processMainStat(data, result.slot);
        }

        result.level = this.processResultLevel(data, result);

        this.art = new Artifact(data.rarity, result.level, result.slot, result.set, result.mainStat, result.subStats);
        this.refreshResult();
    }

    refreshResult() {
        let item;
        let tools = '';
        let art = this.art;

        if (art) {
            item = this.widgetScanned.get(art);

            if (this.opts.groups) {
                tools = '<select class="gi-artifact-group-dropdown drop-up" multiple="multiple" data-autochange="1">';
                for (let item of this.opts.groups) {
                    let selected = Artifact.inGroups([''], item.value);
                    let value = item.value ? item.title : '*';
                    tools += '<option value="'+ value +'"'+ (selected ? ' selected' : '') +'>'+ item.title +'</option>';
                }
                tools += '</select>';
            }

            if (art.getMainStat() && art.getSetName()) {
                this.root.find('.modal-add').show();
            } else {
                this.root.find('.modal-add').hide();
            }
        } else {
            this.root.find('.modal-add').hide();
        }

        let html = '<div class="gi-artifact-scanner-artifact-current">';
        html += '<div>'+ UI.Lang.get('scanner.scanned_artifact') +'</div></div>';

        if (!this.opts.ignoreStorage) {
            html += '<div class="gi-artifact-scanner-artifact-similar">';
            html += '<div>'+ UI.Lang.get('scanner.storage_artifact') +'</div></div>';
        }

        this.root.find('.gi-artifact-scanner-artifact').html(html);
        this.root.find('.gi-artifact-scanner-artifact-current').append(item);
        this.root.find('.gi-artifact-scanner-artifact-current').append(tools);
        this.root.find('.gi-artifact-scanner-artifact-current').find('.gi-artifact-group-dropdown').giDropdown();

        if (!this.opts.ignoreStorage) {
            this.showSimilar(art);
        }
    }

    showSimilar(art) {
        const block = this.root.find('.gi-artifact-scanner-artifact-similar');
        block.html('<div>'+ UI.Lang.get('scanner.storage_artifact') +'</div>');

        let similarArts = this.app.storage.artifacts.getSimilar(art);
        let hasToUpdate = false;

        if (similarArts.length) {
            let hash = Serializer.pack(art);
            let selected = true;
            for (const similar of similarArts) {

                let similar_hash = Serializer.pack(similar.art);
                if (similar_hash == hash) {
                    this.root.find('.modal-add').hide();
                } else {
                    hasToUpdate = true;
                }

                block.append(this.widgetStorage.get(similar.art, {
                    index: similar.index,
                    sample: art.clone(),
                    selected: selected,
                }));
                selected = false;
            }

            new SimpleBar(block[0], {
                autoHide: true
            });
        } else {
            block.append('<div class="text-remark">'+ UI.Lang.get('scanner.no_similar') +'</div>');

        }

        if (hasToUpdate) {
            this.root.find('.modal-update').show();
        } else {
            this.root.find('.modal-update').hide();
        }
    }

    processResultLevel(data, result) {
        if (result && result.slot && result.mainStat) {
            let parser = new ScannerTextSubstat();
            let v = data.mainVal.replace(',', '.');
            let msValue = parser.getStatValue(v, v);

            if (msValue) {
                let slotData = DB.Artifacts.Mainstats.get(result.mainStat);
                let values = slotData.values[data.rarity-1] || [];
                for (let level = 0; level <= 20; ++level) {
                    if (values.getValue(level) == msValue) {
                        return level
                    }
                }
            }
        }

        let maxLevel = DB.Artifacts.Rarity[data.rarity-1].maxLevel;
        let level = parseInt(data.level.replace(/\W/g, ''));

        if (level >= 0 && level <= maxLevel) {
            return level;
        }

        return 0;
    }

    processMainStat(result, slot) {
        let text = result.mainName.replace(/^[^\wа-я]+/ig, '');
        text = text.replace(/[^\wа-я]+$/ig, '').toLowerCase();

        let data = DB.Artifacts.Slots.get(slot);
        let stats = [];

        if (data) {
            stats = data.mainStats;
        } else {
            stats = DB.Artifacts.Mainstats.getKeys();
        }

        let candidates = [];

        for (let stat of stats) {
            let n = UI.Lang.get('stat_artifact.'+ stat).toLowerCase();
            let d = levenshtein(text, n);

            if (d <= Math.min(n.length / 2, 2)) {
                candidates.push({
                    distance: d,
                    stat: stat,
                });
            }
        }

        if (candidates.length > 0) {
            candidates = candidates.sort(function(a, b) {return a.distance - b.distance});
            return candidates[0].stat;
        }

        return '';
    }

    processSlot(result) {
        let text = result.slot.replace(/^[^\wа-я]+/ig, '');
        text = text.replace(/[^\wа-я]+$/ig, '').toLowerCase();

        let candidates = [];

        for (let slot of DB.Artifacts.Slots.getKeys()) {
            let n = UI.Lang.get('artifact_set.'+ slot).toLowerCase();
            let d = levenshtein(text, n);

            if (d <= Math.min(n.length / 2, 4)) {
                candidates.push({
                    distance: d,
                    slot: slot,
                });
            }
        }

        if (candidates.length > 0) {
            candidates = candidates.sort(function(a, b) {return a.distance - b.distance});
            return candidates[0].slot;
        }

        return '';
    }

    processSetName(result) {
        for (let text of [result.set, result.set2]) {
            text = text.replace(/\d+\s*(предме|piec)/ig, '');
            text = text.replace(/^[^\wа-я]+/ig, '');
            text = text.replace(/[^\wа-я]+$/ig, '').toLowerCase();

            for (let setName of DB.Artifacts.Sets.getKeys()) {
                let setData = DB.Artifacts.Sets.get(setName);
                let n = UI.Lang.get(setData.getName()).toLowerCase();

                if (levenshtein(text, n) <= 3) {
                    return setName;
                }
            }
        }

        return '';
    }

    processStats(data) {
        let lines = data.stats.split("\n");
        let result = [];

        let parser = new ScannerTextSubstat();

        for (let line of lines) {
            let item = parser.process(line);

            if (item) {
                result.push(item);
            }
        }

        return result;
    }

    acceptImage(file) {
        if (!file) {
            return;
        }

        const that = this;

        let fr = new FileReader();
        fr.onload = function() {
            let img = new Image();
            img.onload = function() {
                that.processImage(img);
            };
            img.src = fr.result;
        };
        fr.readAsDataURL(file)
    }

    clearResult() {
        this.art = null;
        this.refreshResult();
    }

    getSelectedGroups() {
        return Artifact.trimGroupNames(this.root.find('.gi-artifact-group-dropdown').val());
    }

    bindEvents() {
        const that = this;
        super.bindEvents();

        this.root.find('#file').on('change', function() {
            let file = that.root.find('#file')[0].files[0];

            that.acceptImage(file);
        });

        this.root.find('.modal-add').on('click', function() {
            if (that.art) {
                that.art.setGroups(that.getSelectedGroups())
                that.callback(that.art);
                that.clearResult();
            }
        });

        this.root.find('.modal-update').on('click', function() {
            if (that.art && that.callback) {
                that.art.setGroups(that.getSelectedGroups())

                let index = that.root.find('[name=storage_index]:checked').val();
                let exArt = that.app.storage.artifacts.getArtByIndex(index);

                that.art.setLocked(exArt.isLocked());
                that.app.storage.artifacts.updateByHash(exArt.getHash(), that.art);
                that.app.refresh();

                that.clearResult();
            }
        });

        this.root.find('.modal-close').on('click', function() {
            that.clearResult();
            that.hide();
        });

        this.root.on('click', '.artifact-list-box-edit', function() {
            UI.ArtifactWindow.show(function(result) {
                that.art.replace(result);

                that.refreshResult();
            }, that.art);
        });

        this.root.on('mouseover', '.artifact-list-box-invalid', function() {
            let art = $(this).closest('.artifact-list-box').data('art');

            if (art) {
                let html = art.getErrorsFormatted();
                $('.tooltip-wrapper').css('max-width', 500);
                $('.tooltip-wrapper').html( html ).show();
            }

            return false;
        });

        window.addEventListener("paste", function(event){
            if (that.showed) {
                var items = event.clipboardData.items;

                for (var i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf("image") == -1) continue;

                    var blob = items[i].getAsFile();
                    that.acceptImage(blob);
                }
            }

        }, false);
    }
}
