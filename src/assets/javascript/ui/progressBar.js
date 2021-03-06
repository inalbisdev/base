let $ = require('jquery');
let _ = require('lodash');
let utils = require('../app.utils');
let tippy = require('tippy.js');

module.exports = {

    locators: {
        $trigger: '.js-progress-bar',
        $component: '.o-progress-bar',
        $currentScroll: '.o-progress-bar__current',
        isActive: 'is-active'
    },


    activeProgressBar: function () {
        $(this.locators.$component).addClass(this.locators.isActive);
    },

    shouldInitProgressBar: function () {
        return $('body')[0].getBoundingClientRect().height > utils.getOuterHeight($(window));
    },

    getDrawableElements: function () {
        return $('[data-progress]');
    },

    getProgressPoints: function () {
        return $('.o-progress-bar__point');
    },

    removePreviousPoints: function () {
        this.getProgressPoints().remove();
    },

    setPositionToElements: function ($el) {

        let textToAdd = $($el).data('progress');
        let scrollPosition = utils.getOffsetTop($el);

        let percent = (utils.getOffsetTop($el) / $('body').innerHeight()) * 100;
        $(this.locators.$component).append("<div class='o-progress-bar__point' data-scroll-to='" + scrollPosition + "' title='" + textToAdd + "' style='left:" + percent + "%'></div>");

        tippy('.o-progress-bar__point', {
            delay: 50,
            arrow: false,
            arrowType: 'round',
            size: 'large',
            duration: 500,
            animation: 'scale',
            interactive: true
        });
    },

    drawElements: function () {

        this.removePreviousPoints();

        let $elementsToDraw = this.getDrawableElements(),
            that = this;


        if ($elementsToDraw.length > 0) {
            _.forEach($elementsToDraw, function ($el) {
                that.setPositionToElements($($el));
            });
        }

    },


    updateProgressBar: function (isDevice) {

        this.drawElements();

        let windowTop = utils.viewPortTop(),
            documentHeight = $('body').innerHeight(),
            windowHeight = utils.getOuterHeight($(window)),
            totalScroll = Math.round((windowTop / (documentHeight - windowHeight)) * 100);

        if (isDevice) {
            $(this.locators.$currentScroll).css("height", totalScroll + "%");
        } else {
            $(this.locators.$currentScroll).css("width", totalScroll + "%");
        }
    },

    bindEvents: function () {

        let that = this;
        let isDevice = utils.checkIfIsDevice();

        document.addEventListener("DOMContentLoaded", function () {
            if (that.shouldInitProgressBar()) {
                that.activeProgressBar();
                that.updateProgressBar(isDevice);
            }
        });
        window.addEventListener('scroll', function () {
            that.updateProgressBar(isDevice);
        }, utils.supportPassiveEvents() ? {passive: true} : false);


        $(document).on('click', '.o-progress-bar__point', function () {
            let scrollPosition = $(this).data('scroll-to') - ($(that.locators.$component).innerHeight() * 2);
            utils.smoothScroll(scrollPosition, 500);
        });


    },
    init: function () {
        if (this.locators.$trigger.length > 0) {
            this.bindEvents();
        }
    }
};