define([

    'jquery',
    'underscore',
    'backbone',
    'eventbus',

], function($, _, Backbone, EventBus) {

    var CountdownView = Backbone.View.extend({

        className: 'countdown-container',
        template: _.template($('#countdown-template').html()),

        initialize: function() {
            _(this).bindAll('reset');

            EventBus.on(EventBus.RESTART, this.reset);

            this.listenTo(this.model, 'change', this.render);
        },

        reset: function() {
            this.model.reset();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            if (this.model.get('started') && this.model.get('seconds') === 0) {
                EventBus.trigger(EventBus.TIMES_UP);
            }

            return this;
        }

    });

    return CountdownView;

});
