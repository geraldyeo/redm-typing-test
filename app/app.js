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
        _collection = new WordsCollection();
        _collection.fetch({
            success: _fetchSuccess
        });
    };

    var _fetchSuccess = function(collection, response) {
        // set app view to element
        new AppView({
            collection: collection,
            el: $("#type-test-app")
        });

        // listen for matched
        EventBus.on(EventBus.WORD_MATCHED, _nextWord);

        // advance index
        _nextWord();
    };

    var _nextWord = function() {
        _index += 1;

        if (_index < _collection.length) {
            EventBus.trigger(EventBus.CURRENT_WORD, _collection.at(_index));
        } else {
            _testCompleted();
        }

    };

    var _testCompleted = function() {

    };

    /**
     * App facade
     */
    return {
        initialize: _init
    };
});
