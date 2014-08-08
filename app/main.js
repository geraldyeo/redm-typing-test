require.config({
    paths: {
        "jquery": "bower/jquery/dist/jquery.min",
        "underscore": "bower/lodash/dist/lodash.min",
        "backbone": "bower/backbone/backbone"
    }
});

require(['app'], function(App) {
    App.initialize();
});
