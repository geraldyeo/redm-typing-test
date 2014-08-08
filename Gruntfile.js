"use strict";

module.exports = function(grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "app",
                    mainConfigFile: "app/main.js",
                    include: "main",
                    name: "bower/almond/almond", // assumes a production build using almond
                    out: "public/main.js"
                }
            }
        }
    });

    grunt.registerTask('default', ['requirejs']);
};
