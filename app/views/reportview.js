define([

    'jquery',
    'underscore',
    'backbone',
    'eventbus'

], function($, _, Backbone, EventBus, undef) {

    var ReportView = Backbone.View.extend({

        template: _.template($('#report-template').html()),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return ReportView;

});
