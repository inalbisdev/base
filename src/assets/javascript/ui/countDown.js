let $ = require('jquery');
let utils = require('../app.utils');


module.exports = (function () {

        var locators = {};

        var dateHelpers = {
            secondsInMiliseconds: 1000,
            minutesInMiliseconds: 1000 * 60,
            hoursInMiliseconds: 1000 * 60 * 60,
            daysInMiliseconds: 1000 * 60 * 60 * 24,
            weeksInMiliseconds: 1000 * 60 * 60 * 24 * 7
        };

        var timeMap = {
            do: function (time, start, end) {
                return this[start].run(time, end);
            },
            run: function (timeInMs, end, settings, values) {
                var value = Math.trunc(timeInMs / settings.helper),
                    values = values || {},
                    substract = (timeInMs - (settings.helper * value));
                values[settings.label] = value;
                if (end === settings.label || !settings.nextLabel) {
                    return values;
                } else {
                    return this.next(substract, end, settings.nextLabel, values)
                }
            },
            next: function (time, end, nextLabel, values) {
                return timeMap[nextLabel].run(time, end, values);
            },
            weeks: {
                label: 'weeks',
                nextLabel: 'days',
                helper: dateHelpers.weeksInMiliseconds,
                run: function (time, end, values) {
                    if (end === this.label) {
                        return values;
                    }
                    timeMap.run(time, end, {
                        label: this.label,
                        nextLabel: this.nextLabel,
                        helper: this.helper
                    }, values);
                }
            },
            days: {
                label: 'days',
                nextLabel: 'hours',
                helper: dateHelpers.daysInMiliseconds,
                run: function (time, end, values) {
                    return timeMap.run(time, end, {
                        label: this.label,
                        nextLabel: this.nextLabel,
                        helper: this.helper
                    }, values);
                }
            },
            hours: {
                label: 'hours',
                nextLabel: 'minutes',
                helper: dateHelpers.hoursInMiliseconds,
                run: function (time, end, values) {
                    return timeMap.run(time, end, {
                        label: this.label,
                        nextLabel: this.nextLabel,
                        helper: this.helper
                    }, values);
                }
            },
            minutes: {
                label: 'minutes',
                nextLabel: 'seconds',
                helper: dateHelpers.minutesInMiliseconds,
                run: function (time, end, values) {
                    return timeMap.run(time, end, {
                        label: this.label,
                        nextLabel: this.nextLabel,
                        helper: this.helper
                    }, values);
                }
            },
            seconds: {
                label: 'seconds',
                nextLabel: false,
                helper: dateHelpers.secondsInMiliseconds,
                run: function (time, end, values) {
                    return timeMap.run(time, end, {
                        label: this.label,
                        nextLabel: this.nextLabel,
                        helper: this.helper
                    }, values);


                }
            }
        };

        var getActualDate = function () {
            return new Date().getTime();
        };

        var getLimitDate = function () {
            return new Date(locators.$trigger.data('time-left')).getTime();
        };

        var getTheDifferenceBetweenDates = function () {
            return getLimitDate() - getActualDate();
        };

        var getTimeFormats = function () {

            var time = getTheDifferenceBetweenDates(),
                end = locators.$trigger.data('end') ? locators.$trigger.data('end') : 'seconds',
                start = locators.$trigger.data('start') ? locators.$trigger.data('start') : 'days';

            return timeMap.do(time, start, end);
        };


        var updateCountDown = function () {
            var timeFormats = getTimeFormats();

            locators.$days.length > 0 ? locators.$days.html(utils.makeTwoDigits(timeFormats.days)) : "";
            locators.$hours.length > 0 ? locators.$hours.html(utils.makeTwoDigits(timeFormats.hours)) : "";
            locators.$minutes.length > 0 ? locators.$minutes.html(utils.makeTwoDigits(timeFormats.minutes)) : "";
            locators.$seconds.length > 0 ? locators.$seconds.html(utils.makeTwoDigits(timeFormats.seconds)) : "";
        };


        var bindEvents = function () {
            $(document).ready(function () {
                initCountDown();
            });
        };

        var initCountDown = function () {
            setTimeout(function () {
                locators.$trigger.addClass('is-active');
                updateCountDown();
            }, 0);
            var x = setInterval(function () {
                if (getTheDifferenceBetweenDates() <= 0) {
                    clearInterval(x);
                } else {
                    updateCountDown();
                }
            }, 1000);
        };
        var initLocators = function () {
            locators = {
                $trigger: $('.js-countdown'),
                $timeLeft: $('[data-time-left]'),
                $days: $('[data-days-count]'),
                $hours: $('[data-hours-count]'),
                $minutes: $('[data-minutes-count]'),
                $seconds: $('[data-seconds-count]')
            };
        };

        var init = function () {
            initLocators();
            if (locators.$trigger.length > 0) {
                bindEvents();
            }
        };

        return {
            init: init
        }
    }
)();