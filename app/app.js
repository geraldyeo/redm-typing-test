define([
    // dependencies
    'jquery',
    'underscore',
    'backbone',
    'eventbus',
    'collections/words',
    'views/appview'

], function($, _, Backbone, EventBus, WordsCollection, AppView) {

    var _collection;
    var _index = -1;

    /**
     * Start fetching json, and create the app view on success.
     */
    var _init = function() {
        var words = new WordsCollection();
        words.fetch({
            success: _fetchSuccess
        });
    };

    var _fetchSuccess = function(collection, response) {
        _collection = collection;

        new AppView({
            collection: collection,
            el: $("#type-test-app")
        });

        EventBus.on(EventBus.WORD_MATCHED, _nextWord);
        _nextWord();
    };

    var _nextWord = function() {
        _index += 1;
        EventBus.trigger(EventBus.CURRENT_WORD, _collection.at(_index));
    };

    /**
     * App facade
     */
    return {
        initialize: _init
    };
});
