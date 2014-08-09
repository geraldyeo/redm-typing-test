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

    // http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-with-format-hhmmss
    function toMMSS(timeStr) {
        var sec_num = parseInt(timeStr, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = minutes + ':' + seconds;
        return time;
    }

    var Countdown = Backbone.Model.extend({
        // default attributes
        defaults: {
            seconds: countdownFrom,
            mmss: toMMSS(countdownFrom),
            started: false
        },

        initialize: function() {},

        reset: function() {
            clearInterval(timer);
            this.set('started', false);
            this.set('seconds', countdownFrom);
            this.set('mmss', toMMSS(countdownFrom));
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
                this.set('mmss', toMMSS(this.get('seconds')));

                if (this.get('seconds') === 0) {
                    clearInterval(timer);
                }
            }, this), 1000);
        }
    });

    return Countdown;
});
