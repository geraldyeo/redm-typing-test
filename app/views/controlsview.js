define([

    'jquery',
    'underscore',
    'backbone',
    'eventbus'

], function($, _, Backbone, EventBus, undef) {

    var SPACE_KEY = 32;

    var ControlsView = Backbone.View.extend({
        // current word model
        _currentWord: undef,

        events: {
            "keyup .edit": '_checkOnSpace'
        },

        initialize: function() {
            _(this).bindAll('_updateCurrentWord', '_checkOnSpace');
            EventBus.on(EventBus.CURRENT_WORD, this._updateCurrentWord);
        },

        _updateCurrentWord: function(word) {
            this._currentWord = word;
        },

        _checkOnSpace: function(e) {
            if (!this._currentWord) {
                return;
            }

            var $target = $(e.target),
                word,
                userInput;

            if (e.which === SPACE_KEY) {
                // all ok...
                if (this._checkWord(this._currentWord, $target, true)) {
                    $target.val('');
                    this._currentWord.set('matched', true);

                    EventBus.trigger(EventBus.WORD_MATCHED);
                } else {
                    // wrong somewhere...
                    EventBus.trigger(EventBus.WORD_ERROR, this._currentWord);
                }
            } else {
                if (this._checkWord(this._currentWord, $target)) {
                    // ok so far...
                    EventBus.trigger(EventBus.WORD_ERROR);
                } else {
                    // wrong somewhere...
                    EventBus.trigger(EventBus.WORD_ERROR, this._currentWord);
                }
            }
        },

        _checkWord: function(word, $input, len) {
            var wordStr = $.trim(word.get('text')),
                userInput = $.trim($input.val());

            for (var i = 0, max = userInput.length; i < max; i++) {
                if (wordStr.charAt(i) !== userInput.charAt(i)) {
                    return false;
                }
            }

            return true && (len ? (wordStr.length === userInput.length) : true);
        }

    });

    return ControlsView;

});
