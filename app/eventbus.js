define([

    'jquery',
    'underscore',
    'backbone',

], function($, _, Backbone) {
    return _.extend({
        CURRENT_WORD: 'eb:CURRENT_WORD',
        WORD_POSITION: 'eb:WORD_POSITION',
        WORD_ERROR: 'eb:WORD_ERROR'
    }, Backbone.Events);
});
