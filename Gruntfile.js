'use strict';

// LiveReload utilities.
var path = require('path');

module.exports = function(grunt) {

    // Grunt configuration.
    // --------------------
    grunt.initConfig({

        // Load folders configuration.
        appConfig: grunt.file.readJSON('./appConfig.json'),

        // Install Bower dependencies.
        bower: {
            install: {
                options: {
                    install : true
                }
            }
        },

        // Clean folders before compile assets.
        clean:  {
            bower   : 'lib',
            dev     : '<%= appConfig.app.dev %>',
            dist    : '<%= appConfig.app.dist %>',
            scripts : '<%= appConfig.app.dev %>/<%= appConfig.scripts.src %>',
            styles  : '<%= appConfig.app.dev %>/<%= appConfig.styles.src %>'
        },

        // Compile CoffeeScript.
        coffee: {

            // Compile Coffee for development environment.
            dev: {
                expand : true,
                cwd    : '<%= appConfig.app.src %>/<%= appConfig.scripts.src %>',
                dest   : '<%= appConfig.app.dev %>/<%= appConfig.scripts.src %>',
                src    : '**/*.coffee',
                ext    : '.js'
            }
        },

        // Compile Compass.
        compass: {

            // Compile Compass for development environment.
            dev: {
                options: {
                    basePath : '.',
                    cssDir   : '<%= appConfig.app.dev %>/<%= appConfig.styles.src %>',
                    sassDir  : '<%= appConfig.app.src %>/<%= appConfig.styles.src %>'
                }
            }
        },

        // Copy files to production folder.
        copy: {
            dev: {
                files: [
                    {
                        cwd    : '<%= appConfig.app.src %>',
                        dest   : '<%= appConfig.app.dev %>',
                        expand : true,
                        src    : [ '**/*' ]
                    }
                ]
            },

            dist: {
                files: [
                    {
                        cwd    : '<%= appConfig.app.src %>',
                        dest   : '<%= appConfig.app.dist %>',
                        dot    : true,
                        expand : true,
                        src    : [
                            '**',
                            '!**/lib/**',
                            '!**/<%= appConfig.app.templatesSrc %>/**',
                            '!**/<%= appConfig.scripts.src %>/**',
                            '!**/<%= appConfig.styles.src %>/**'
                        ]
                    }
                ]
            }
        },

        // Start ExpressJS server.
        express: {

            // Development environment.
            dev: {
                options: {
                    bases   : [
                        '<%= appConfig.app.dev %>',
                        '<%= appConfig.app.src %>'
                    ],
                    debug   : true,
                    monitor : {},
                    port    : '<%= appConfig.server.port %>',
                    server  : path.resolve('./<%= appConfig.server.src %>')
                }
            },

            // Production environment.
            dist: {
                options: {
                    bases   : [
                        '<%= appConfig.app.dist %>'
                    ],
                    port    : process.env.PORT || '<%= appConfig.server.port %>',
                    server  : path.resolve('./<%= appConfig.server.src %>')
                }
            }
        },

        // Minify HTML files.
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA   : true,
                    collapseWhitespace        : true,
                    collapseBooleanAttributes : true,
                    removeAttributeQuotes     : true,
                    removeRedundantAttributes : true,
                    useShortDoctype           : true,
                    removeEmptyAttributes     : true,
                    removeOptionalTags        : true
                },

                files: [
                    {
                        expand : true,
                        cwd    : '<%= appConfig.app.dist %>',
                        dest   : '<%= appConfig.app.dist %>',
                        src    : '**/*.html'
                    }
                ]
            }
        },

        // Generate anotations for angular injections.
        ngmin: {
            dist: {
                cwd    : '<%= appConfig.app.dist %>/<%= appConfig.scripts.src %>',
                expand : true,
                src    : [ '**/*.js' ],
                dest   : '<%= appConfig.app.dist %>/<%= appConfig.scripts.src %>'
            }
        },

        // Inline AngularJS templates.
        ngtemplates: {
            dist: {
                options: {
                    base   : '<%= appConfig.app.dev %>',
                    module : '<%= appConfig.app.ngModule %>'
                },
                src  : '<%= appConfig.app.dev %>/<%= appConfig.app.templatesSrc %>/**/*.html',
                dest : '<%= appConfig.app.dev %>/<%= appConfig.scripts.src %>/templates.js'
            }
        },

        // Open a web server with a given URL.
        open: {
            server: {
                path: 'http://localhost:<%= appConfig.server.port %>'
            }
        },

        // Watch for changes in files and call a given task.
        regarde: {
            coffee: {
                files : '<%= appConfig.app.src %>/<%= appConfig.scripts.src %>/**/*.coffee',
                tasks : 'compile:coffee'
            },
            compass: {
                files : '<%= appConfig.app.src %>/<%= appConfig.styles.src %>/**/*.{sass,scss}',
                tasks : 'compile:compass'
            },
            livereload: {
                files : '<%= appConfig.livereload.files %>',
                tasks : 'livereload'
            }
        },

        // Use minified assets on HTML files depending on environment.
        usemin: {
            html : [ '<%= appConfig.app.dist %>/**/*.html' ]
        },

        // Prepare usemin to compile assets in the specified order.
        useminPrepare: {
            html    : '<%= appConfig.app.dev %>/**/*.html',
            options : {
                dest : '<%= appConfig.app.dist %>'
            }
        }
    });

    // Load tasks.
    // -----------

    // https://github.com/ericclemmons/grunt-angular-templates
    grunt.loadNpmTasks('grunt-angular-templates');

    // https://github.com/yatskevich/grunt-bower-task
    grunt.loadNpmTasks('grunt-bower-task');

    // https://github.com/gruntjs/grunt-contrib-clean
    grunt.loadNpmTasks('grunt-contrib-clean');

    // https://github.com/gruntjs/grunt-contrib-coffee
    grunt.loadNpmTasks('grunt-contrib-coffee');

    // https://github.com/gruntjs/grunt-contrib-compass
    grunt.loadNpmTasks('grunt-contrib-compass');

    // https://github.com/gruntjs/grunt-contrib-concat
    grunt.loadNpmTasks('grunt-contrib-concat');

    // https://github.com/gruntjs/grunt-contrib-copy
    grunt.loadNpmTasks('grunt-contrib-copy');

    // https://github.com/gruntjs/grunt-contrib-cssmin
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // https://github.com/gruntjs/grunt-contrib-htmlmin
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // https://github.com/gruntjs/grunt-contrib-livereload
    grunt.loadNpmTasks('grunt-contrib-livereload');

    // https://github.com/gruntjs/grunt-contrib-uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // https://github.com/blai/grunt-express
    grunt.loadNpmTasks('grunt-express');

    // https://github.com/btford/grunt-ngmin
    grunt.loadNpmTasks('grunt-ngmin');

    // https://npmjs.org/package/grunt-open
    grunt.loadNpmTasks('grunt-open');

    // https://github.com/yeoman/grunt-regarde
    grunt.loadNpmTasks('grunt-regarde');

    // https://github.com/yeoman/grunt-usemin
    grunt.loadNpmTasks('grunt-usemin');

    // Custom tasks.
    // -------------

    // Compile assets.
    grunt.registerTask('compile', function(task) {

        if (task === undefined) {
            console.log('Running all compilers.');
            return grunt.task.run([ 'compile:coffee', 'compile:compass' ]);
        };

        var cleaner = (task === 'coffee') ? 'clean:scripts' : 'clean:styles';
        grunt.task.run([ cleaner, task ])
    });

    // Compress, concatenate, generate documentation and run unit tests.
    grunt.registerTask('build', [
        'clean:dist',
        'compile',
        'copy:dist',
        'copy:dev',
        'ngtemplates',
        'useminPrepare',
        'concat',
        'cssmin',
        'ngmin',
        'uglify',
        'usemin',
        'htmlmin',
        'clean:dev'
    ]);

    // Start local server and watch for changes in files.
    grunt.registerTask('dev', [
        'compile',
        'livereload-start',
        'express:dev',
        'open',
        'regarde'
    ]);

    // Create build and then open it for preview.
    grunt.registerTask('dist', [
        'express:dist',
        'express-keepalive'
    ]);

    // Compile assets for production on Heroku side.
    grunt.registerTask('heroku', [
        'bower',
        'clean:bower',
        'build'
    ]);
}