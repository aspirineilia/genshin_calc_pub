import $ from "jquery";
import SimpleBar from 'simplebar';

import "../../css/ui/Dropdown.css"

var methods = {
    init: function() {
        return this.each(function() {
            let $this = $(this);

            $this.wrap('<div class="gi-dropdown-wrapper"></div>');
            let wrapper = $this.closest('.gi-dropdown-wrapper');
            const isMultiple = $this.attr('multiple');
            const autoChange = $this.data('autochange');

            wrapper.append('<div class="gi-dropdown-current"></class>');

            let options = $('<div class="gi-dropdown-options"></div>');

            if ($this.find('option[selected]').length == 0 && !isMultiple) {
                $this.find('option').first().attr('selected', 'selected');
            }

            wrapper.find('.gi-dropdown-current').html();
            let selectedText = [];
            let separator = '';

            $this.find('option').each(function() {
                let option = $('<div class="gi-dropdown-option"></div>');

                if ($(this).hasClass('caption')) {
                    option.removeClass('gi-dropdown-option').addClass('gi-dropdown-caption');
                }

                let optionText = '<span class="gi-dropdown-option-text">'+ $(this).text() +'</span>';
                let iconClass;
                if ($(this).data('icon')) {
                    iconClass = 'icon-'+ $(this).data('icon');
                } else if ($(this).data('icon-class')) {
                    iconClass = $(this).data('icon-class');
                }

                if (iconClass) {
                    optionText = '<span class="gi-dropdown-icon '+ iconClass +'"></span>' + optionText;
                }

                if ($(this).attr('selected')) {
                    let currentText = optionText;
                    let icon        = $this.data('icon');

                    if ($(this).text()) {
                        separator = ', ';
                    }

                    if (icon) {
                        currentText = '<span class="gi-dropdown-icon icon-'+ icon +'"></span>' + currentText;
                    }

                    selectedText.push(currentText);
                    option.addClass('selected');
                }

                option.html(optionText);
                option.data('value', $(this).attr('value'));

                option.appendTo(options);
            });

            wrapper.find('.gi-dropdown-current').html(selectedText.join(separator));
            options.appendTo(wrapper);

            $this.data('bar', new SimpleBar(wrapper.find('.gi-dropdown-options')[0], {
                autoHide: true
            }));

            wrapper.find('.gi-dropdown-current').on('click', function() {
                $(this).toggleClass('opened');
                if ($(this).hasClass('opened')) {
                    $this.data('bar').recalculate();
                    options.css('top', '');
                    if (isDropUp($this)) {
                        let options = wrapper.find('.gi-dropdown-options');
                        options.css('top', -15 - options.height());
                    }

                    if (options.find('.selected').length) {
                        let top = Math.max(0, options.find('.selected').offset().top - options.offset().top - 80);
                        options.find('.simplebar-content-wrapper').scrollTop(top);
                    }
                } else {
                    $this.trigger('change');
                }
            })

            wrapper.find('.gi-dropdown-option').on('click', function() {
                let optionValue = $(this).data('value');

                if (isMultiple) {
                    let currentValues = [];
                    $this.find('option:selected').each(function() {
                        currentValues.push($(this).attr('value'))
                    });

                    let index = currentValues.indexOf(optionValue)
                    if (index >= 0) {
                        $(this).removeClass('selected');
                        currentValues.splice(index, 1);
                    } else {
                        $(this).addClass('selected');
                        currentValues.push(optionValue)
                    }

                    $this.find('option').removeAttr('selected');

                    let selectedText = [];
                    let separator = '';

                    for (let value of currentValues) {
                        if (!value) {
                            continue;
                        }
                        let option = $this.find('option[value="'+ value +'"]');
                        option.attr('selected', 'selected');

                        let optionText = option.text();
                        if (optionText) {
                            separator = ', ';
                        }

                        let icon = option.data('icon') || $this.data('icon');
                        if (icon) {
                            optionText = '<span class="gi-dropdown-icon icon-'+ icon +'"></span>' + optionText;
                        }

                        selectedText.push(optionText);
                    }

                    wrapper.find('.gi-dropdown-current').html(selectedText.join(separator));

                    if (autoChange) {
                        $this.trigger('change');
                    }
                } else {
                    let optionText = $(this).html();

                    let icon = $this.data('icon');
                    if (icon) {
                        optionText = '<span class="gi-dropdown-icon icon-'+ icon +'"></span>' + optionText;
                    }

                    wrapper.find('.gi-dropdown-current').removeClass('opened').html(optionText);
                    wrapper.find('.gi-dropdown-option').removeClass('selected');
                    $(this).addClass('selected');

                    $this.val(optionValue).trigger('change');
                }

                return false;
            });
        });
    }
};

function isDropUp($this) {
    if ($this.hasClass('drop-up')) {
        return true;
    } else if ($this.hasClass('drop-down')) {
        return false;
    }

    let wrapper = $this.closest('.gi-dropdown-wrapper');
    let options = wrapper.find('.gi-dropdown-options');
    let height = UI.Layout.windowHeight()

    if (height - options.offset().top > options.height() + 30) {
        return false;
    } else if (options.offset().top > options.height() + 50) {
        return true;
    }

    return false
}

$.fn.giDropdown = function(method) {
    if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
    } else {
        $.error('Method ' +  method + ' does not exists in jQuery.giDropdown');
    }
};
