import $ from "jquery";
import "../../css/ui/Slider.css"

var methods = {
    init: function(options) {
        let that = this;
        let defaults = {
            showButtons: true,
            showTitle: false,
            showValues: true,
            showSelected: false,
            min: 1,
            value: 1,
            max: 10,
            step: 1,
            change: null,
        };

        let opts = $.extend({}, defaults, options);
        opts.value ||= opts.min;

        this.data('opts', opts);
        this.attr('min', opts.min).attr('max', opts.max).attr('step', opts.step).val(opts.value);

        this.wrap('<div class="gi-slider-wrapper"><div class="gi-slider-container"></div></div>');
        this.parent().prepend('<div class="gi-slider-progress"></div><div class="gi-slider-progress-gray"></div>');

        let wrapper = this.closest('.gi-slider-wrapper');

        if (opts.showSelected) {
            wrapper.prepend('<div class="gi-slider-min-value"></div>');
            wrapper.append('<div class="gi-slider-max-value">'+ opts.value +'</div>');
        } else if (opts.showValues) {
            wrapper.prepend('<div class="gi-slider-min-value">'+ opts.min +'</div>');
            wrapper.append('<div class="gi-slider-max-value">'+ opts.max +'</div>');
        }

        if (opts.showButtons) {
            wrapper.prepend('<div class="gi-slider-minus"></div>');
            wrapper.append('<div class="gi-slider-plus"></div>');

            wrapper.find('.gi-slider-plus').on('click', function() {
                let val = parseFloat(that.val());
                let opts = that.data('opts');
                that.val(val + parseFloat(opts.step)).trigger('input');
            })

            wrapper.find('.gi-slider-minus').on('click', function() {
                let val = parseFloat(that.val());
                let opts = that.data('opts');
                that.val(val - parseFloat(opts.step)).trigger('input');
            })
        }

        this.on('input', function() {
            let value = that.val();

            refresh(that);

            if (opts.change) {
                opts.change.call(that, value);
            }

            if (opts.showSelected) {
                wrapper.find('.gi-slider-max-value').text(value);
                that.trigger('resize');
            }

            return false;
        });
    },
    'get value': function() {
        let opts = this.data('opts');

        if (opts.items) {
            return opts.items[this.val() - 1];
        } else {
            return this.val();
        }
    },
    'set value': function(value) {
        this.val(value);
        refresh(this);
    },
    'range': function(min, max, step) {
        let opts = this.data('opts');
        let wrapper = this.closest('.gi-slider-wrapper');

        opts.min = min;
        opts.max = max;
        opts.step = step || opts.step;

        if (opts.showSelected) {
            wrapper.find('.gi-slider-min-value').text();
            wrapper.find('.gi-slider-max-value').text(this.val());
        } else {
            wrapper.find('.gi-slider-min-value').text(min);
            wrapper.find('.gi-slider-max-value').text(max);
        }
        this.attr('min', opts.min).attr('max', opts.max).attr('step', opts.step);
        refresh(this);
    },
    'refresh': function() {
        refresh(this);
    }
};

function refresh(slider) {
    let value = slider.val();
    let width = slider.width();
    let opts = slider.data('opts');
    if (!opts) {
        return;
    }
    let wrapper = slider.closest('.gi-slider-wrapper');

    let pos   = Math.round(10 + (value - opts.min)/(opts.max - opts.min) * (width - 20));

    wrapper.find('.gi-slider-progress').css('width', pos);
    wrapper.find('.gi-slider-progress-gray').css('width', width - pos);
}

$.fn.giSlider = function(method) {
    if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
    } else {
        $.error('Method ' +  method + ' does not exists in jQuery.giSlider');
    }
};

