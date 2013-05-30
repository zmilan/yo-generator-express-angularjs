'use strict';

// LiveReload utilities.
var path        = require('path'),
    lrSnippet   = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
    mountFolder = function(connect, dir) {
        return connect['static'](dir);
    };

module.exports = function(grunt) {

    // Grunt configuration.
    // --------------------
    grunt.initConfig({

        // Load folders configuration.
        AppConfig: grunt.file.readJSON('./config/AppConfig.json'),

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
            dev     : '<%= AppConfig.app.dev %>',
            dist    : '<%= AppConfig.app.dist %>',
            scripts : '<%= AppConfig.app.dev %>/<%= AppConfig.scripts.src %>',
            styles  : '<%= AppConfig.app.dev %>/<%= AppConfig.styles.src %>'
        },

        // Compile CoffeeScript.
        coffee: {

            // Compile Coffee for development environment.
            dev: {
                expand : true,
                cwd    : '<%= AppConfig.app.src %>/<%= AppConfig.scripts.src %>',
                dest   : '<%= AppConfig.app.dev %>/<%= AppConfig.scripts.src %>',
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
                    cssDir   : '<%= AppConfig.app.dev %>/<%= AppConfig.styles.src %>',
                    sassDir  : '<%= AppConfig.app.src %>/<%= AppConfig.styles.src %>'
                }
            }
        },

        // Launch web server.
        connect: {

            // Connect to development environment.
            dev: {
                options: {
                    port       : process.env.PORT || '<%= AppConfig.server.port %>',
                    middleware : function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, grunt.template.process('<%= AppConfig.app.dev %>')),
                            mountFolder(connect, grunt.template.process('<%= AppConfig.app.src %>')),

                            // Enable directory listing.
                            connect.directory(grunt.template.process('<%= AppConfig.app.dev %>')),
                            connect.directory(grunt.template.process('<%= AppConfig.app.src %>'))
                        ];
                    }
                }
            },

            // Connect to production environment.
            dist: {
                options: {
                    port : process.env.PORT || '<%= AppConfig.server.port %>',
                    middleware : function(connect) {
                        return [
                            mountFolder(connect, grunt.template.process('<%= AppConfig.app.dist %>')),

                            // Enable directory listing.
                            connect.directory(grunt.template.process('<%= AppConfig.app.dist %>'))
                        ];
                    }
                }
            }
        },

        // Copy files to production folder.
        copy: {
            dev: {
                files: [
                    {
                        cwd    : '<%= AppConfig.app.src %>',
                        dest   : '<%= AppConfig.app.dev %>',
                        expand : true,
                        src    : [ '**/*' ]
                    }
                ]
            },

            dist: {
                files: [
                    {
                        cwd    : '<%= AppConfig.app.src %>',
                        dest   : '<%= AppConfig.app.dist %>',
                        dot    : true,
                        expand : true,
                        src    : [
                            '**',
                            '!**/lib/**',
                            '!**/<%= AppConfig.app.templatesSrc %>/**',
                            '!**/<%= AppConfig.scripts.src %>/**',
                            '!**/<%= AppConfig.styles.src %>/**'
                        ]
                    }
                ]
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
                        cwd    : '<%= AppConfig.app.dist %>',
                        dest   : '<%= AppConfig.app.dist %>',
                        src    : '**/*.html'
                    }
                ]
            }
        },

        // LiveReload configuration.
        livereload: {
            port: '<%= AppConfig.livereload.port %>'
        },

        // Generate anotations for angular injections.
        ngmin: {
            dist: {
                cwd    : '<%= AppConfig.app.dist %>/<%= AppConfig.scripts.src %>',
                expand : true,
                src    : [ '**/*.js' ],
                dest   : '<%= AppConfig.app.dist %>/<%= AppConfig.scripts.src %>'
            }
        },

        // Inline AngularJS templates.
        ngtemplates: {
            dist: {
                options: {
                    base   : '<%= AppConfig.app.dev %>',
                    module : '<%= AppConfig.app.ngModule %>'
                },
                src  : '<%= AppConfig.app.dev %>/<%= AppConfig.app.templatesSrc %>/**/*.html',
                dest : '<%= AppConfig.app.dev %>/<%= AppConfig.scripts.src %>/templates.js'
            }
        },

        // Open a web server with a given URL.
        open: {
            server: {
                path: 'http://localhost:<%= AppConfig.server.port %>'
            }
        },

        // Watch for changes in files and call a given task.
        regarde: {
            coffee: {
                files : '<%= AppConfig.app.src %>/<%= AppConfig.scripts.src %>/**/*.coffee',
                tasks : 'compile:coffee'
            },
            compass: {
                files : '<%= AppConfig.app.src %>/<%= AppConfig.styles.src %>/**/*.{sass,scss}',
                tasks : 'compile:compass'
            },
            livereload: {
                files : '<%= AppConfig.livereload.files %>',
                tasks : 'livereload'
            }
        },

        // Use minified assets on HTML files depending on environment.
        usemin: {
            html : [ '<%= AppConfig.app.dist %>/**/*.html' ]
        },

        // Prepare usemin to compile assets in the specified order.
        useminPrepare: {
            html    : '<%= AppConfig.app.dev %>/**/*.html',
            options : {
                dest : '<%= AppConfig.app.dist %>'
            }
        }
    });

    // Load tasks.
    // -----------

    https://github.com/ericclemmons/grunt-angular-templates
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

    // https://github.com/gruntjs/grunt-contrib-connect
    grunt.loadNpmTasks('grunt-contrib-connect');

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

        // Clean dist folder.
        'clean:dist',

        // Compile assets on dev folder.
        'compile',

        // Copy all non-scripts and non-styles files from source to dist folder.
        'copy:dist',

        // Copy JS files from source to dev folder.
        'copy:dev',

        // Inline AngularJS templates.
        'ngtemplates',

        // Prepare usemin task.
        'useminPrepare',

        // Join all JS files.
        'concat',

        // Compress all CSS files.
        'cssmin',

        // Generate anotations for angular files.
        'ngmin',

        // // Compress all JS files.
        'uglify',

        // Use minified styles/scripts sources.
        'usemin',

        // Compress HTML files.
        'htmlmin',

        // Remove dev folder.
        'clean:dev'
    ]);

    // Start local server and watch for changes in files.
    grunt.registerTask('dev', [
        'compile',
        'livereload-start',
        'connect:dev',
        'open',
        'regarde'
    ]);

    // Create build and then open it for preview.
    grunt.registerTask('dist', [
        'build',
        'open',
        'connect:dist:keepalive'
    ]);

    // Compile assets for production on Heroku side.
    grunt.registerTask('heroku', [
        'bower',
        'clean:bower',
        'build'
    ]);
}