define([

    'jquery',
    'underscore',
    'backbone',

], function($, _, Backbone) {
    return _.extend({
        CURRENT_WORD: 'eb:CURRENT_WORD',
        WORD_POSITION: 'eb:WORD_POSITION',
        WORD_ERROR: 'eb:WORD_ERROR',
        WORD_MATCHED: 'eb:WORD_MATCHED',
        WORD_UNMATCHED: 'eb:WORD_UNMATCHED',
        TIMES_UP: 'eb:TIMES_UP',
        RESTART: 'eb:RESTART',
    }, Backbone.Events);
});
