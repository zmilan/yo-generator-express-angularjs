// Environment configuration.
// --------------------------
// When loading this module, it will return the requested
// configuration object to be used across the application.

module.exports = {

    // Development environment.
    development: {
        db : 'mongodb://localhost/myawesomeapp'

        // You can place here as many configuration objects as you want,
        // for example, Facebook API configuration for the different environments,
        // Twitter API, etc/
    },

    // Production environment.
    production: {
        db : ''

        // You can place here as many configuration objects as you want,
        // for example, Facebook API configuration for the different environments,
        // Twitter API, etc/
    }
}