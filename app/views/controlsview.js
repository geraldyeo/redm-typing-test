define([

    'jquery',
    'underscore',
    'backbone',
    'eventbus',
    'models/countdown',
    'views/countdownview'

], function($, _, Backbone, EventBus, CountdownModel, CountdownView, undef) {

    var SPACE_KEY = 32;

    var ControlsView = Backbone.View.extend({
        // current word model
        _currentWord: undef,
        _countdown: undef,

        events: {
            "keyup .edit": '_checkOnSpace',
            "click .redo": '_restart'
        },

        initialize: function() {
            _(this).bindAll('_updateCurrentWord', '_checkOnSpace', '_restart', '_preventUserInput');

            this.$input = this.$el.find('.edit');

            this._countdown = new CountdownView({
                model: new CountdownModel()
            });

            EventBus.on(EventBus.CURRENT_WORD, this._updateCurrentWord);
            EventBus.on(EventBus.TIMES_UP, this._preventUserInput);

            this.render();
        },

        _updateCurrentWord: function(word) {
            this._currentWord = word;
        },

        _restart: function(e) {
            console.log('redo')
            EventBus.trigger(EventBus.RESTART);
        },

        _preventUserInput: function() {
            this.$input.val('');
            this.$input.attr('disabled', 'disabled');
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

            if (!this._countdown.model.get('started')) {
                this._countdown.model.start();
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
        },

        render: function() {
            this.$el.append(this._countdown.render().el);
            return this;
        }

    });

    return ControlsView;

});
