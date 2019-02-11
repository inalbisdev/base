let $ = require('jquery');
let slick = require('slick-carousel');

module.exports = {

    locators: {
        $trigger: '.js-slick',
        $stepLink: ".bf-list__link",
        $bfOfferInner: ".bf-offer-list__inner"
    },


    initSlider: function ($el) {
        $el.slick({
            arrows: false,
            dots: false,
            slidesToShow: 1,
            autoplay: false,
            fade: true,
            draggable: false,
            touchMove: false,
            swipe: false
        });

    },


    getSlider: function () {
        return $(this.locators.$trigger);
    },

    goToStep: function (position) {
        this.getSlider().slick('slickGoTo', position)
    },

    resetActiveLink: function () {
        $(this.locators.$stepLink).removeClass('is-active');
    },

    setMinHeight: function () {
        let target = $('.bf-offer-list'),
            heightToAdd = $('.bf-time-left').innerHeight();


        if (window.innerWidth <= 991) {

            target.css({
                "min-height": window.innerHeight - heightToAdd,
                "margin-top": heightToAdd
            });
        }

    },


    bindEvents: function () {

        let that = this;

        $(document).ready(function () {
            that.initSlider($(that.locators.$trigger));
        });

        $(this.locators.$stepLink).on('click', function (e) {
            e.preventDefault();
            that.resetActiveLink();
            $(this).addClass('is-active');
            that.goToStep($(this).data('step'));
        });


        $('.bf-social__open').on('click', function (e) {
            e.preventDefault();
            $('.bf-social-fixed-inner').toggleClass('is-active');
        });


        that.setMinHeight();
        $(window).on('resize', function () {
            that.setMinHeight();
        })


    },

    init: function () {
        this.bindEvents();
    }

};