angular.module('myAwesomeApp').controller 'GuideCtrl', ($scope, listData, $rootScope) ->

    # Hide loading message.
    $rootScope.loading = false

    # View title.
    @title = 'Generator documentation.'

    # Get docs list.
    @list = listData

    # Return controller data.
    return @