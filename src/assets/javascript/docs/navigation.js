let $ = require('jquery');
let utils = require('../app.utils');
let _ = require('lodash');


module.exports = {

    locators: {
        $trigger: '.js-anchor',
        $docsNav: ".dc-l-docs__nav",
        $docsNavLink: ".dc-l-docs__nav-link",
        defaultHiddenClass: 'u-hidden',
        scrollItems: function () {
            this.getNavLinks().map(function () {
                let item = $($(this).data("anchor"));
                if (item.length) {
                    return item;
                }
            });
        }
    },


    getNavLinks: function () {
        return $(this.locators.$docsNavLink, this.locators.$docsNav);
    },

    getScrollItems: function () {


        this.getNavLinks().map(function () {
            let item = $($(this).data("anchor"));
            if (item.length) {
                return item;
            }
        });



    },




    bindEvents: function () {


        $(this.locators.$trigger).on('click', function () {
            let scrollPosition = utils.getOffsetTop($($(this).data('anchor')));
            utils.smoothScroll(scrollPosition, 500);
        });


    },

    init: function () {

        this.bindEvents();

    }
};
