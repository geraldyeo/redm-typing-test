define([

    'jquery',
    'underscore',
    'backbone',

], function($, _, Backbone) {
    return _.extend({
        CURRENT_WORD: 'eb:CURRENT_WORD',
        WORD_MATCHED: 'eb:WORD_MATCHED'
    }, Backbone.Events);
});
