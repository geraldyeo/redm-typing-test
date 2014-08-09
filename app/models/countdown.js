define(['backbone'], function(Backbone) {
    var Countdown = Backbone.Model.extend({
        // default attributes
        defaults: {
            seconds: 0
        },

        timer: 0,

        // toggle the 'matched' state of word item
        start: function() {


        }
    });

    return Countdown;
});
