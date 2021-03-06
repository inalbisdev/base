let $ = require('jquery');
let slick = require('slick-carousel');
let lazy = require('lazysizes');
let tippy = require('tippy.js');





const App = {
    utils: require('./app.utils'),
    ui: require('./docs.ui')
};

(function init () {
    window.App = App;
    window.$ = $;
    const initAll= function () {
        App.utils.init();
        App.ui.loading.init();
        App.ui.progressBar.init();
        App.ui.modal.init();
        App.ui.effectRipple.init();
        App.ui.slider.init();
        App.ui.favorites.init();
        App.ui.tippy.init();
        App.ui.toggle.init();
        App.ui.shadow.init();
        App.ui.scrollTop.init();
        App.ui.scrollOpacity.init();
        App.ui.showCode.init();
        App.ui.navigation.init();

    };
    initAll();
})();
