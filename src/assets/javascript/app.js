let $ = require('jquery');
let slick = require('slick-carousel');
let lazysizes = require('lazysizes');

const App = {
    utils: require('./app.utils'),
    ui: require('./app.ui')
};

(function init () {
    window.App = App;
    window.$ = $;
    const initAll= function () {
        App.utils.init();
        App.ui.loading.init();
        App.ui.slider.init();
        App.ui.countDown.init();
    };
    initAll();
})();
