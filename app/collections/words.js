define([
    'backbone',
    '../models/word'
], function(Backbone, Word) {
    var WordsCollection = Backbone.Collection.extend({
        // model mapping
        model: Word,
        // server resource
        url: '/words.json',

        initialize: function() {
            this.fetch({
                success: this._fetchSuccess,
                error: this._fetchError
            });
        },

        // fetch handlers
        _fetchSuccess: function(collection, response) {
            //console.log('Collection models:', collection.models);
        },
        _fetchError: function(collection, response) {
            console.error('Words fetch error');
        }
    });

    return WordsCollection;
});
