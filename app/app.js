define([
    // dependencies
    'jquery',
    'underscore',
    'backbone',
    'eventbus',
    'collections/words',
    'models/report',
    'views/appview'

], function($, _, Backbone, EventBus, WordsCollection, ReportModel, AppView) {

    var _appView;
    var _collection;
    var _reportModel;
    var _index = -1;
    var _numWrong = 0;

    /**
     * Start fetching json, and create the app view on success.
     */
    var _init = function() {
        _collection = new WordsCollection();
        _collection.fetch({
            success: _fetchSuccess
        });

        _reportModel = new ReportModel();
    };

    var _fetchSuccess = function(collection, response) {
        console.log(_reportModel);
        // set app view to element
        _appView = new AppView({
            collection: _collection,
            el: $("#type-test-app")
        });

        _appView.addReport(_reportModel);

        // listen for matched
        EventBus.on(EventBus.WORD_MATCHED, _nextWord);
        EventBus.on(EventBus.TIMES_UP, _testCompleted);
        EventBus.on(EventBus.RESTART, _testRestarted);
        EventBus.on(EventBus.WORD_ERROR, _countWrong);

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

    var _countWrong = function(word) {
        if (word) {
            _numWrong += 1;
        }
    };

    var _testCompleted = function() {
        var count = 0;
        _collection.each(function(model) {
            count += model.get('matched') ? 1 : 0;
        });

        _reportModel.set('numCorrect', count);
        _reportModel.set('numWrong', _numWrong);

        console.log('words correct:', count);
        console.log('typed wrong:', _numWrong);
    };

    var _testRestarted = function() {
        _collection.each(function(model) {
            model.set('matched', false);
        });

        _appView.removeReport();

        _numWrong = 0;
        _index = -1;
        _nextWord();
    };

    /**
     * App facade
     */
    return {
        initialize: _init
    };
});
