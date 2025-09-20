import $ from "jquery";

import "../../css/modal.css"
import "../../css/modal/WindowZIndex.css"

export class Window {
    constructor() {
    }

    init() {
        if (this.initialized) {
            return;
        }

        this.root = $('<div class="gi-modal"></div>');
        this.back = $('<div class="gi-modal-back"></div>');

        // borders
        let html = '<div class="gi-modal-border">';
        html += '<div class="gi-modal-corner top-left"></div>';
        html += '<div class="gi-modal-corner top-right"></div>';
        html += '<div class="gi-modal-corner bottom-left"></div>';
        html += '<div class="gi-modal-corner bottom-right"></div>';
        html += '</div>';
        html += '<div class="gi-modal-caption"><span class="gi-modal-caption-text"></span>';
        html += '<div class="gi-modal-close"></div></div>';
        html += '<div class="gi-modal-content"></div>';

        this.root.append(html);
        this.setCaption( UI.Lang.get(this.caption) )

        this.root.appendTo(document.body);
        this.back.appendTo(document.body);

        this.initialized = 1;
    }

    show() {
        if (this.initialized) {
            this.showed = true;
            this.root.show();
            this.back.show();

            $('body').addClass('no-scroll');
            $('.tooltip-wrapper').hide();

            this.resizeContent();
        }
    }

    hide() {
        if (this.initialized) {
            this.showed = false;
            this.root.hide();
            this.back.hide();

            $('body').removeClass('no-scroll');
        }
    }

    setCaption(caption) {
        this.root.find('.gi-modal-caption-text').html(caption);
    }

    setContent(html) {
        this.root.find('.gi-modal-content').empty().append(html);
    }

    appendContent(html) {
        this.root.find('.gi-modal-content').append(html);
    }

    resizeContent() {
        if (!this.root.is(':visible')) {
            return;
        }

        let center = this.root.hasClass('gi-window-center');

        if (!center && UI.Layout.isMobile()) {
            this.root.css('left', '');
            this.root.css('top', '');
        } else {
            let windowWidth  = UI.Layout.windowWidth();
            let windowHeight = UI.Layout.windowHeight();
            let modalWidth   = this.root.innerWidth();
            let modalHeight  = this.root.innerHeight();

            this.root.css('left', Math.max(6, (windowWidth - modalWidth) / 2));
            this.root.css('top',  Math.max(6, (windowHeight - modalHeight) / 2));
        }
    }

    bindEvents() {
        let that = this;

        $(window).on('resize', function() {
            that.resizeContent();
        });

        this.root.find('.gi-modal-close').on('click', function() {
            that.hide();
        });

        this.root.on('click', '.gi-tab-change', function() {
            that.hide();
        });
    }
}
