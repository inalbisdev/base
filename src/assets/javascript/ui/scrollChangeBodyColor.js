let $ = require('jquery');
let utils = require('../app.utils');
let _ = require('lodash');


module.exports = {


    locators: {
        $trigger: "data-scroll-color",
        $class: "a-gradient"
    },

    options: [
        {"id": "a-gradient-paranoia"},
        {"id": "a-color-primary"}
    ],


    changeColor: function (option) {

        $("body").addClass(option)

    },

    checkForComponents: function () {
        let that = this;
        _.forEach($("[data-scroll-color]"), function ($el) {
            if (utils.isElementOnViewPort($($el))) {
                that.changeColor($($el).data('scroll-color'))
            }
        });
    },

    bindEvents: function () {
        let that = this;
        window.addEventListener('scroll', function (e) {
            //that.checkForComponents();
        }, utils.supportPassiveEvents() ? {passive: true} : false);


    },

    init: function () {
        this.bindEvents();
    }

};
