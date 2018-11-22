let $ = require('jquery');

module.exports = (function () {
    var locators = {
            social: {
                init: '.social_share_trigger',
                data: {
                    name: 'social',
                    image: 'share-image',
                    via: 'via',
                    text: 'share-text',
                    url: 'share-link',
                    hashtags: 'hashtags'
                }
            }
        },
        social = {
            mappers: {
                twitter: function (data) {
                    return {
                        url: data.link,
                        text: data.text,
                        hashtags: data.hashtags,
                        via: data.via
                    };
                },
                facebook: function (data) {
                    return {
                        u: data.link,
                        quote: data.text,
                        hashtags: data.hashtags
                    };
                },
                linkedin: function (data) {
                    return {
                        url: data.link,
                        mini: true,
                        title: data.title,
                        summary: data.text,
                        source: data.link
                    }
                },
                whatsapp: function (data) {
                    return {
                        text: data.link
                    }
                },
                google: function (data) {
                    return {
                        text: data.text,
                        url: data.link
                    }
                }
            },
            action: {
                twitter: function (data) {
                    redirectToSocialMedia('https://twitter.com/share?', data);
                },

                facebook: function (data) {
                    redirectToSocialMedia('https://www.facebook.com/sharer/sharer.php?', data);
                },

                linkedin: function (data) {
                    redirectToSocialMedia('https://www.linkedin.com/shareArticle?', data);
                },

                whatsapp: function (data) {
                    redirectToSocialMedia('whatsapp://send?', data);
                },

                google: function (data) {
                    redirectToSocialMedia('https://plus.google.com/share?', data);
                }
            }
        },
        listeners = {
            social: function () {
                $('body').delegate(locators.social.init, 'click', function () {
                    var $element = $(this),
                        network = $element.data(locators.social.data.name),
                        params = getParamsByNetwork(getFilledElement($element), network);
                    if (social.action[network]) {
                        social.action[network](params);
                    }
                });
            }
        },
        getFilledElement = function ($element) {
            var socialTarget = $element.data('social-target'),
                $targetById = $('#' + socialTarget),
                $target = $targetById.length ? $targetById : $('.' + socialTarget);
            return $target.length ? $target : $element;
        },
        redirectToSocialMedia = function (baseUrl, data) {
            window.open(baseUrl + paramsToArray(data).join('&'));
        },
        getParamsByNetwork = function ($element, network) {
            var socialMap = locators.social.data,
                settings = ({
                    network: network,
                    image: $element.data(socialMap.image),
                    text: $element.data(socialMap.text),
                    link: $element.data(socialMap.url),
                    hashtags: $element.data(socialMap.hashtags),
                    via: $element.data(socialMap.via)
                });
            return social.mappers[network](settings);
        },
        paramsToArray = function (data) {
            var params = [];
            for (var value in data) {
                if (data && data[value]) {
                    params.push(value + '=' + encodeURIComponent(data[value]));
                }
            }
            return params;
        },
        init = function () {
            listeners.social();
        };
    init();
})();