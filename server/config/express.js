// Configure ExpressJS web server.

// Module dependencies.
// --------------------
var express = require('express'),
    gzippo  = require('gzippo');


// Export module.
// --------------
module.exports = function(express, app, env, config) {
    
    // Server configuration.
    app.configure(function() {

        // Configuration for development environment.
        if (env === 'development') {

            // Enable Express logger.
            app.use(express.logger());

            // Enable LiveReload middleware.
            app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);
        }

        // Configuration for production environment.
        else if (env === 'production') {

            // Enable gzip compression for public assets.
            app.use(express.compress());
        }

        // General configuration.
        // ----------------------
        app.use(express.favicon());
        app.use(express.bodyParser());
        app.use(express.methodOverride());

        // Enable ExpressJS router.
        app.use(app.router);
    });
}