// Requires.
var AppConfig = require('../config/AppConfig.json'),
    express   = require('express'),
    gzippo    = require('gzippo');

// Create express function.
var app = express();

// Create HTTP server object.
var server = require('http').createServer(app);

// Configuration for development environment.
app.configure(function() {

    // Enable Express logger.
    app.use(express.logger());

    // Enable gzip compression.
    app.use(express.compress());

    // Use LiveReload.
    app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);
});

// Export modules for Grunt task.
module.exports = server;

// Override: Provide an "use" used by grunt-express.
module.exports.use = function() {
    app.use.apply(app, arguments);
}