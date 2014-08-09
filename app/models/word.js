define(['backbone'], function(Backbone) {
    var Word = Backbone.Model.extend({
        // default attributes
        defaults: {
            text: '',
            matched: false,
            passed: false
        }
    });

    return Word;
});
