let $ = require('jquery');
let utils = require('../app.utils');
let _ = require('lodash');


module.exports = {

    locators : {
        $trigger: '.js-html',
        defaultHiddenClass: 'u-hidden'
    },




    showMessage: function($el){
        this.$getMessage().addClass('is-active').find('code').text(this.$getCode($el));
    },

    $activeMessage: function(){

    },

    $removeMessage: function(){},


    $getMessage: function(){
      return $('.dc-m-message');
    },


    $getCode: function($el){
        let code = $el.parents('.dc-o-component').find('.dc-o-component__body > *');

        return code[0].outerHTML;

        //this.$getMessage().find('code').text(code[0].outerHTML)

    },

    bindEvents: function () {

        let that = this;


        $('.js-anchor').on('click',function () {
            let scrollPosition = utils.getOffsetTop($($(this).data('anchor')));
            utils.smoothScroll(scrollPosition, 500);
        });

        $('.dc-m-message__close').on('click',function () {
            that.$getMessage().removeClass('is-active');
        });

        $(this.locators.$trigger).on('click',function (e) {
            e.preventDefault();
            that.showMessage($(this));
        });




    },

    init: function () {

            this.bindEvents();

    }
};
