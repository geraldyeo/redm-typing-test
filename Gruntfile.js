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

        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    sourcemap: true,
                    environment: 'development'
                }
            }
        },

        autoprefixer: {
            main: {
                files: {
                    'public/stylesheets/main.css': 'public/stylesheets/main.css'
                }
            }
        },

        processhtml: {
            dev: {
                files: {
                    'public/index.html': ['app/index.html']
                }
            },
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
                script: 'server/server.js',
                options: {
                    ignore: ['node_modules/**', 'public/**'],
                    ext: 'js,json',
                    watch: ['server']
                }
            }
        },

        watch: {
            options: {
                livereload: 35729
            },
            scripts: {
                files: ['app/**/*.{js,html}', '!**/node_modules/**'],
                tasks: ['requirejs', 'processhtml:dev']
            },
            json: {
                files: ['app/**/*.json'],
                tasks: ['copy']
            },
            styles: {
                files: ['app/scss/**/*.{scss,sass}'],
                tasks: ['compass', 'autoprefixer']
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            serverwatch: ['nodemon', 'watch']
        },
    });

    grunt.registerTask('default', ['requirejs', 'compass', 'autoprefixer', 'processhtml:dev', 'copy', 'concurrent:serverwatch']);

    grunt.registerTask('dist', ['requirejs', 'compass', 'autoprefixer', 'processhtml:dist', 'copy']);
};
