import $ from "jquery";

import "../../css/ui/Tooltip.css"
export class Tooltip {
    constructor() {
    }

    init() {
        if (this.initialized) {
            return;
        }

        this.root = $('<div class="gi-tooltip '+ this.class +'"></div>');
        this.root.appendTo(document.body);

        this.bindEvents();
        this.initialized = 1;
    }

    bindEvents() {

    }

    updatePosition(e) {
        // TODO out of window
        this.root.css('left', e.clientX + 20);
        this.root.css('top', e.clientY);
    }

    show() {
        this.root.show();
    }

    hide() {
        this.root.hide();
    }
}
