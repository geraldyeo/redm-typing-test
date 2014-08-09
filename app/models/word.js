define(['backbone'], function(Backbone) {
    var Word = Backbone.Model.extend({
        // default attributes
        defaults: {
            text: '',
            matched: false
        },

        // toggle the 'matched' state of word item
        toggle: function() {
            this.set('matched', !this.get('matched'));
        }
    });

    return Word;
});
