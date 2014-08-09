define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    /**
     * Rudimentary countdown timer.
     * Don't bet on accuracy.
     */
    var countdownFrom = 60;
    var timer;

    var Countdown = Backbone.Model.extend({
        // default attributes
        defaults: {
            seconds: countdownFrom,
            started: false
        },

        initialize: function() {
        },

        reset: function() {
            clearInterval(timer);
            this.set('started', false);
            this.set('seconds', countdownFrom);
        },

        start: function() {
            if (this.get('started')) {
                return;
            }

            clearInterval(timer);

            this.set('seconds', countdownFrom);
            this.set('started', true);

            timer = setInterval(_.bind(function() {
                this.set('seconds', this.get('seconds') - 1);

                if (this.get('seconds') === 0) {
                    clearInterval(timer);
                }
            }, this), 1000);
        }
    });

    return Countdown;
});
