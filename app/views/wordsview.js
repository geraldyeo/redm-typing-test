define([

    'jquery',
    'underscore',
    'backbone',
    'eventbus',
    'views/wordview'

], function($, _, Backbone, EventBus, WordView) {

    var WordsView = Backbone.View.extend({
        _lastTop: 0,

        initialize: function() {
            _(this).bindAll('add', '_updateListPosition', '_reset');

            this._$ul = this.$el.find('.word-list');
            this._children = [];

            this.collection.each(this.add);
            this.collection.bind('add', this.add);

            EventBus.on(EventBus.WORD_POSITION, this._updateListPosition);
            EventBus.on(EventBus.RESTART, this._reset);
        },

        add: function(model) {
            var child = new WordView({
                model: model
            });

            this._children.push(child);

            if (this._rendered) {
                this._$ul.append(child.render().el);
            }
        },

        _reset: function() {
            this._lastTop = 0;
            this._$ul.css('margin-top', '');
        },

        _updateListPosition: function(position) {
            if (this._lastTop < position.top) {
                var marginTop = parseInt(this._$ul.css('margin-top'));
                this._$ul.css('margin-top', (marginTop - 34) + 'px');

                this._lastTop = position.top;
            }
        },

        render: function() {
            var that = this;

            this._rendered = true;

            this._$ul.empty();

            _(this._children).each(function(child) {
                that._$ul.append(child.render().el);
            });

            return this;
        }

    });

    return WordsView;

});
