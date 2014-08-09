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
        // set app view to element
        _appView = new AppView({
            collection: _collection,
            el: $("#type-test-app")
        });

        _appView.addReport(_reportModel);

        // listen for matched
        EventBus.on(EventBus.WORD_MATCHED, _nextWord);
        EventBus.on(EventBus.WORD_UNMATCHED, _nextWord);
        EventBus.on(EventBus.TIMES_UP, _testCompleted);
        EventBus.on(EventBus.RESTART, _testRestarted);

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
        var i = 0,
            correctCount = 0,
            wrongCount = 0;

        _collection.each(function(model) {
            if (i <= _index) {
                correctCount += model.get('matched') ? 1 : 0;
                wrongCount += model.get('passed') ? 1 : 0;
                i++;
            }
        });

        _reportModel.set('numCorrect', correctCount);
        _reportModel.set('numWrong', wrongCount);

        console.log('words correct:', correctCount);
        console.log('words wrong:', wrongCount);
    };

    var _testRestarted = function() {
        _collection.each(function(model) {
            model.set('matched', false);
            model.set('passed', false);
        });

        _appView.removeReport();

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
