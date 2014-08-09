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
        },

        processhtml: {
            dist: {
                files: {
                    'public/index.html': ['app/index.html']
                }
            }
        },

        copy: {
            public: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'app/words.json',
                    dest: 'public/'
                }]
            }
        },

        nodemon: {
            dev: {
                script: 'server/server.js'
            }
        },

        watch: {
            options: {
                livereload: 35729
            },
            scripts: {
                files: ['app/**/*.{js,html}', '!**/node_modules/**'],
                tasks: ['requirejs', 'processhtml']
            },
            json: {
                files: ['app/**/*.json'],
                tasks: ['copy']
            },
            styles: {
                files: ['app/scss/**/*.{scss,sass}'],
                tasks: ['clean:css', 'compass:dev', 'autoprefixer']
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            serverwatch: ['nodemon', 'watch']
        },
    });

    grunt.registerTask('default', ['requirejs', 'processhtml', 'copy', 'concurrent:serverwatch']);

    grunt.registerTask('dist', ['requirejs', 'processhtml', 'copy']);
};
