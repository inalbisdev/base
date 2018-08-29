let $ = require('jquery');
let utils = require('../app.utils');
let _ = require('lodash');


module.exports = {

    locators: {
        $trigger: '.js-scroll-opacity',
        $component: ".a-scroll-opacity"
    },

    animateElement: function(){
        let $componentHeight = $(this.locators.$component).height();

        $(this.locators.$component).css({
            opacity: function () {
                return 1 - ($componentHeight - utils.viewPortTop()) / $componentHeight;
            }
        })
    },

    bindEvents: function () {
        let that = this;
        window.addEventListener('scroll',function (e) {
            that.animateElement();
        },utils.supportPassiveEvents() ? {passive: true} : false);


    },

    init: function () {
        this.bindEvents();
    }

};
