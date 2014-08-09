define([

    'jquery',
    'underscore',
    'backbone',
    'views/wordsview',
    'views/controlsview',
    'views/reportview'

], function($, _, Backbone, WordsView, ControlsView, ReportView, undef) {

    var AppView = Backbone.View.extend({

        initialize: function() {
            // child views references
            this._wordsView = new WordsView({
                collection: this.collection,
                el: this.$el.find('.words')
            });

            this._controlsView = new ControlsView({
                el: this.$el.find('.controls')
            });

            this.render();
        },

        addReport: function(model) {
            if (!this._reportView) {
                this._reportView = new ReportView({
                    model: model,
                    el: this.$el.find('.report')
                });
                this._reportView.$el.empty();
            }
        },

        removeReport: function() {
            if (this._reportView) {
                this._reportView.$el.empty();
            }
        },

        render: function() {
            this._wordsView.render();

            return this;
        }

    });

    return AppView;

});
