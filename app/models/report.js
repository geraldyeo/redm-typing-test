define(['backbone'], function(Backbone) {
    var Report = Backbone.Model.extend({
        // default attributes
        defaults: {
            numCorrect: 0,
            numWrong: 0
        }
    });

    return Report;
});
