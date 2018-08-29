let $ = require('jquery');
let utils = require('../app.utils');


module.exports = {

    locators: {
        $trigger: '.js-scroll-reveal'
    },

    bindEvents: function () {


        let slideUp = {
            distance: '100px',
            origin: 'bottom',
            opacity: null,
            reset: true,
            delay: 100
        };

        $(document).ready(function () {
            ScrollReveal().reveal('.slide-up', slideUp);
        });



    },

    init: function () {

            this.bindEvents();

    }

};