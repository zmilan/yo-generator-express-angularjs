# Declare application module.
angular.module('myAwesomeApp', [ 'ngResource' ])

    # API base URL.
    .constant('apiUrl', '/models/')

    # Application configuration.
    .config ($routeProvider) ->

        # Application routes.
        $routeProvider

        .when '/guide',
            controller  : 'GuideCtrl as guide'
            templateUrl : 'templates/views/guide/GuideView.html'
            resolve     :
                listData : [
                    '$q'
                    'Guide'
                    '$rootScope'
                    ($q, Guide, $rootScope) ->
                        defer = $q.defer()

                        # Show application loading message.
                        $rootScope.loading = true

                        Guide.query (data) ->
                            defer.resolve(data)

                        defer.promise
                ]

        .otherwise
            redirectTo : '/guide'