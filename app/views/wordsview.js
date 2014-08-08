define([

    'jquery',
    'underscore',
    'backbone',
    'eventbus',
    'views/wordview'

], function($, _, Backbone, EventBus, WordView) {

    var WordsView = Backbone.View.extend({
        initialize: function() {
            _(this).bindAll('add');

            this._$ul = this.$el.find('.word-list');
            this._children = [];

            this.collection.each(this.add);
            this.collection.bind('add', this.add);
        },

        add: function(model) {
            var child = new WordView({
                model: model
            });

            this._children.push(child);

            if (this._rendered) {
                this.$el.append(child.render().el);
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
