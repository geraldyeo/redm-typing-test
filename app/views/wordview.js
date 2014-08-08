define([

    'jquery',
    'underscore',
    'backbone',
    'eventbus'

], function($, _, Backbone, EventBus) {

    var WordView = Backbone.View.extend({
        // list
        tagName: 'li',
        className: 'word-item',

        // cache the template
        template: _.template($('#word-template').html()),

        initialize: function() {
            _(this).bindAll('_updateHighlight', '_updateMatched', '_updateError');

            EventBus.on(EventBus.CURRENT_WORD, this._updateHighlight);
            EventBus.on(EventBus.WORD_MATCHED, this._updateMatched);
            EventBus.on(EventBus.WORD_ERROR, this._updateError);

            this.listenTo(this.model, 'change', this.render);
        },

        _updateHighlight: function(model) {
            if (this.model.cid === model.cid) {
                this.$el.addClass('highlight');
            } else {
                this.$el.removeClass('highlight');
            }
        },

        _updateMatched: function(model) {
            if (this.model.cid === model.cid) {
                this.$el.addClass('correct');
            }
        },

        _updateError: function(model) {
            if (model && model.cid === this.model.cid) {
                this.$el.addClass('wrong');
            } else {
                this.$el.removeClass('wrong');
            }
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return WordView;

});
