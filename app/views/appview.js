define([

    'jquery',
    'underscore',
    'backbone',
    'views/wordsview',
    'views/controlsview'

], function($, _, Backbone, WordsView, ControlsView) {

    var AppView = Backbone.View.extend({

        initialize: function() {
            console.log('Yay! App View!');

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

        render: function() {
            this._wordsView.render();

            return this;
        }

    });

    return AppView;

});
