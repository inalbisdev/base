let $ = require('jquery');

module.exports = {

    locators : {
        $loading : '.bf-loading'
    },

    setSessionStorage: function(){

        sessionStorage.setItem('loading','1');
    },

    bindEvents: function () {
        let that = this;
        window.onload = function () {
            //that.setSessionStorage();
            $(that.locators.$loading).addClass('is-hidden');
            $('body').addClass('is-loaded');
        };

    },
    init: function () {
        this.bindEvents();
    }

};