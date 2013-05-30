var AppConfig = require('../config/AppConfig.json'),
    express   = require('express'),
    gzippo    = require('gzippo'),
    app       = express();

// Enable Express logger.
app.use(express.logger());

// Enable gzip compression.
app.use(express.compress());

// Serve web server on given folder.
app.configure(function() {
    app.use(gzippo.staticGzip(AppConfig.app.dist));
});

// Start web server.
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Express listening on port ' + port);
});