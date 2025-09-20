import $ from "jquery";

import 'simplebar/dist/simplebar.css';
import "../../css/ui/Layout.css"
import "../../css/ui/LayoutTouch.css"

const beforeUnloadHandler = (event) => {
    event.preventDefault();
    event.returnValue = true;
};

export class Layout {
    constructor() {
        this.initialized = 0;
        this.prevIsNarrow = null;
    }

    init(app) {
        this.app = app;

        if (this.initialized) {
            return;
        }

        $('.gi-copyright-text').html(UI.Lang.get('layout.copyright'));
        $('.gi-version').html('<a href="#" class="link-whats-new">'+ app.version.replace(/[^\d\.]/, '') +'</a>');

        this.bindEvents();

        UI.CharTab.init(app);
        UI.WeaponTab.init(app);
        UI.ArtifactsTab.init(app);
        UI.BestArtifactTab.init(app);
        UI.EnemyTab.init(app);
        UI.BuffsTab.init(app);
        UI.FoodTab.init(app);
        UI.StatsTabReact.init(app);
        UI.FeaturesTabReact.init(app);
        UI.WeaponSuggestTab.init(app);
        UI.ArtifactSetTab.init(app);
        UI.ArtifactsGeneratorTab.init(app);
        UI.ArtifactSubstatTab.init(app);
        UI.CompareTab.init(app);
        UI.RotationTab.init(app);
        UI.ArtifactsStorageTab.init(app);

        this.addRightSpacer();

        UI.ShareTab.init(app);
        UI.SettingsTab.init(app);

        UI.ArtifactScanner.init(app);
        UI.WindowHelp.init(app);
        UI.WindowGood.init(app);
        UI.WindowSelectFeatureList.init(app);
        UI.WindowSelectGroupList.init(app);

        // React windows
        UI.WeaponSelectReact.init(app);
        UI.CharSelectReact.init(app);
        UI.ArtifactSetSelectReact.init(app);
        UI.EnemySelectReact.init(app);
        UI.LockArtifacts.init(app);
        UI.PartyLoad.init(app);
        UI.EnkaImport.init(app);

        UI.TooltipArtifact.init(app);
        UI.WindowCharTalent.init(app);
        UI.ArtifactSetSettingsModal.init(app);
        UI.Sync.init(app);

        this.initialized = 1;

        $('body').addClass(UI.Lang.getLang());

        this.showChangelog();
    }

    addRightTab(name, tabClass, containerClass) {
        let tab = $('<div class="gi-tab-item '+ tabClass +'" data-tab="'+ tabClass +'"><div class="gi-tab-item-inner"></div></div>');
        let tab2 = tab.clone();

        tab.appendTo('.gi-layout-right-tabs');
        tab2.addClass('tab-narrow');
        tab2.appendTo('.gi-layout-left-tabs');

        let container = $('<div class="gi-tab-right gi-tab-container '+ containerClass +'" data-tab="'+ tabClass +'"></div>')
        container.appendTo('.gi-layout-right-content');

        if ($('.gi-layout-right-tabs .gi-tab-item').length == 1) {
            tab.trigger('click');
        }
    }

    addLeftTab(name, tabClass, containerClass) {
        let tab = $('<div class="gi-tab-item '+ tabClass +'" data-tab="'+ tabClass +'"><div class="gi-tab-item-inner"></div></div>');
        let container = $('<div class="gi-tab-left gi-tab-container '+ containerClass +'" data-tab="'+ tabClass +'"></div>');

        tab.appendTo('.gi-layout-left-tabs');
        container.appendTo('.gi-layout-left-content');

        if ($('.gi-layout-left-tabs .gi-tab-item').length == 1) {
            tab.trigger('click');
        }
    }

    addRightSpacer() {
        $('.gi-layout-right-tabs').append('<div class="flex-spacer"></div>')
    }

    addLeftSpacer() {
        $('.gi-layout-left-tabs').append('<div class="flex-spacer"></div>')
    }

    refresh(opts) {
        opts = Object.assign({}, opts);
        if (!this.initialized) {
            return;
        }

        let changed = this.toggleLayout($(window).width() < 1150)
        if (!changed) {
            this.refreshActiveTabs(opts);
        }

        UI.TooltipArtifact.hide();
        $('.tooltip-wrapper').hide();
    }

    showTab(name) {
        $('.gi-tab-item.gi-'+ name +'-tab:visible').trigger('click');
    }

    refreshActiveTabs() {
        let isNarrow = $('body').hasClass('narrow');

        if (isNarrow) {
            let tabName = $('.gi-layout-left-tabs .gi-tab-item.active').data('tab');
            this.refreshTab(tabName);

        } else {
            let tabName1 = $('.gi-layout-left-tabs .gi-tab-item.active:not(.tab-narrow)').data('tab');
            let tabName2 = $('.gi-layout-right-tabs .gi-tab-item.active').data('tab');

            this.refreshTab(tabName1);
            this.refreshTab(tabName2);
        }
    }

    refreshTab(tabName) {
        $('.gi-tab-container[data-tab='+ tabName +']').trigger('tab_active');
    }

    refreshTabsVisibility() {
        $('.gi-tab-container').hide();
        let isNarrow = $('body').hasClass('narrow');

        if (isNarrow) {
            $('.gi-layout-right-content').find('.gi-tab-right').addClass('gi-tab-left');
            let container = $('.gi-layout-left-tabs .gi-tab-item.active');
            if (!container.length) {
                container = $('.gi-layout-left-tabs .gi-tab-item:not(.tab-narrow)');
            }
            this.showLeftTab(container.data('tab'));
        } else {
            $('.gi-layout-right-content').find('.gi-tab-right').removeClass('gi-tab-left');

            let container1 = $('.gi-layout-left-tabs .gi-tab-item.active:not(.tab-narrow)');
            if (!container1.length) {
                container1 = $('.gi-layout-left-tabs .gi-tab-item:not(.tab-narrow)');
            }

            let container2 = $('.gi-layout-right-tabs .gi-tab-item.active');
            if (!container2.length) {
                container2 = $('.gi-layout-right-tabs .gi-tab-item');
            }

            this.showLeftTab(container1.data('tab'));
            this.showRightTab(container2.data('tab'));
        }
    }

    showChangelog() {
        let lastVersion = (localStorage.last_version || '').replace(/[^\d\.]/, '');
        let curVersion = this.app.version.replace(/[^\d\.]/, '');

        if (lastVersion != curVersion) {
            localStorage.last_version = this.app.version;

            if (lastVersion) {
                UI.WindowHelp.show(UI.Lang.get('modal_window.changelog'), 'changelog');
            }
        } else {
            let cur = new Date();
            let dateStr = cur.toDateString();
            let lastDate = localStorage.last_date || '';

            if (lastDate != dateStr) {
                UI.WindowMessage.show('layout.announce', 'layout.not_supported');
                localStorage.setItem('last_date', dateStr)
            }
        }
    }

    toggleLayout(isNarrow) {
        $('body').toggleClass('narrow', isNarrow);

        if (this.prevIsNarrow != isNarrow) {
            this.prevIsNarrow = isNarrow;
            if (isNarrow) {
                $(window).trigger('resize');
            }
            this.refreshTabsVisibility();
            return true;
        }

        return false;
    }

    showLeftTab(tabName) {
        $('.gi-layout-left-tabs .gi-tab-item').removeClass('active');
        $('.gi-tab-item[data-tab='+ tabName +']').addClass('active');
        $('.gi-tab-container[data-tab='+ tabName +']').show().trigger('tab_active');

        this.inTabChangeActions();
    }

    showRightTab(tabName) {
        $('.gi-layout-right-tabs .gi-tab-item').removeClass('active');
        $('.gi-tab-item[data-tab='+ tabName +']').addClass('active');
        $('.gi-tab-container[data-tab='+ tabName +']').show().trigger('tab_active');

        this.inTabChangeActions();
    }

    inTabChangeActions() {
        document.dispatchEvent(new Event('dropdown_open'));
    }

    isMobile() {
        return $('body').hasClass('narrow');
    }

    lockClosing() {
        window.addEventListener("beforeunload", beforeUnloadHandler);
    }

    unlockClosing() {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
    }

    windowWidth() {
        return Math.max(window.innerWidth, document.documentElement.clientWidth);
    }

    windowHeight() {
        return Math.max(window.innerHeight, document.documentElement.clientHeight);
    }

    bindEvents() {
        let that = this;

        $('.gi-layout-left-tabs').on('click', '.gi-tab-item', function() {
            $('.gi-tab-left.gi-tab-container').hide();
            $(this).addClass('active');

            that.showLeftTab($(this).data('tab'));
        });

        $('.gi-layout-right-tabs').on('click', '.gi-tab-item', function() {
            $('.gi-tab-right.gi-tab-container').hide();
            $(this).addClass('active');

            that.showRightTab($(this).data('tab'));
        });

        $('.gi-main-container').height( $(window).height() - 35 );

        $(window).resize(function() {
            $('.gi-main-container').height( $(window).height() - 35 );
            $('.tooltip-wrapper').hide();
            that.toggleLayout($(window).width() < 1150)
        })

        $('.gi-lang-switch').on('click', function() {
            localStorage.lang = $(this).hasClass('lang-rus') ? 'rus' : 'eng';
            window.location.reload();
        });

        $(document).on('mouseover', '[data-tooltip]', function() {
            if (!that.isMobile()) {
                $('.tooltip-wrapper').css('max-width', 300);
                $('.tooltip-wrapper').text( $(this).data('tooltip') ).show();
            }
            return false;
        });

        $(document).on('mouseleave', '[data-tooltip]', function() {
            $('.tooltip-wrapper').hide();
            return false;
        });

        $(document).on('mousemove', '[data-tooltip]', function(e) {
            const docWidth = $(document).width();
            const width = $('.tooltip-wrapper').width();
            const height = $('.tooltip-wrapper').height();
            const offset = $(this).offset();

            let left = offset.left - width / 2;
            let top = offset.top - height - 20;

            if (top < 0) {
                top = e.clientY + 20;
            }

            if (left + width > docWidth) {
                left = docWidth - width;
            }

            if (left < 0) {
                left = 0;
            }

            $('.tooltip-wrapper').css('left', left);
            $('.tooltip-wrapper').css('top', top);

            return false;
        });

        $(document).on('click', '.link-whats-new', function() {
            UI.WindowHelp.show(UI.Lang.get('modal_window.changelog'), 'changelog');
            return false;
        });

        $(document).on('tab_active',  function() {
            $('.tooltip-wrapper').hide();
        });

        $(document).on('click', '.gi-skill-info', function() {
            let skill = $(this).data('skill');
            let charId = $(this).closest('[data-char]').data('char');

            UI.WindowCharTalent.show(skill, charId);

            return false;
        });

        $(document).on('click', '.gi-tab-change', function() {
            let tab = $(this).data('tab');
            that.showTab(tab);
        });

        $(document).on('click', '.gi-settings-enka-import', function() {
            UI.EnkaImport.show();
            return false;
        });
    }
}
