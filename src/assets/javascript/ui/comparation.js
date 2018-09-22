let $ = require('jquery');
let utils = require('../app.utils');
let juxtapose = require('juxtaposejs/build/js/juxtapose');


module.exports = {

    getWebBeforeAudit : function(){
      return $('#before');
    },
    getWebAfterAudit : function(){
        return $('#after');
    },


    renderValues : function(){
        let values = this.getValues();
        $('[data-result-weight] span').html(values.results.weight.percentage + '%');
        $('[data-result-petitions] span').html(values.results.petitions.percentage + '%');
        $('[data-result-dom] span').html(values.results.dom.percentage + '%');
        $('[data-result-load] span').html(values.results.load.percentage + '%');
    },

    getValues : function(){

        let that = this;
        let values = new function() {

            this.webBefore = {
                weight: {
                    value: that.getWebBeforeAudit().find('[data-weight]')[0].dataset.weight
                },
                petitions: {
                    value: that.getWebBeforeAudit().find('[data-petitions]')[0].dataset.petitions
                },
                dom: {
                    value: that.getWebBeforeAudit().find('[data-dom-time]')[0].dataset.domTime,
                },
                load: {
                    value: that.getWebBeforeAudit().find('[data-load-time]')[0].dataset.loadTime,
                }
            };
            this.webAfter = {
                weight: {
                    value: that.getWebAfterAudit().find('[data-weight]')[0].dataset.weight
                },
                petitions: {
                    value: that.getWebAfterAudit().find('[data-petitions]')[0].dataset.petitions,
                },
                dom: {
                    value: that.getWebAfterAudit().find('[data-dom-time]')[0].dataset.domTime,
                },
                load: {
                    value: that.getWebAfterAudit().find('[data-load-time]')[0].dataset.loadTime,
                }
            };
            this.results = {
                weight: {
                    absolute: this.webBefore.weight.value - this.webAfter.weight.value,
                    percentage: -((Math.round((this.webAfter.weight.value * 100) /  this.webBefore.weight.value)) - 100)
                },
                petitions: {
                    absolute: this.webBefore.petitions.value - this.webAfter.petitions.value,
                    percentage: -(Math.round(((this.webAfter.petitions.value * 100)) / this.webBefore.petitions.value) - 100)
                },
                dom: {
                    absolute: this.webBefore.dom.value - this.webAfter.dom.value,
                    percentage: -(Math.round((this.webAfter.dom.value * 100) /  this.webBefore.dom.value) - 100)
                },
                load: {
                    absolute: this.webBefore.load.value - this.webAfter.load.value,
                    percentage: -(Math.round((this.webAfter.load.value * 100) /  this.webBefore.load.value) - 100)
                },
            }
        };


        return values;

    },

    init: function () {
        this.renderValues();
    }

};