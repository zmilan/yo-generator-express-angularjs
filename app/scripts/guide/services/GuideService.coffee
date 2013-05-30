angular.module('myAwesomeApp').factory 'Guide', (apiUrl, $resource) ->
    $resource apiUrl + 'guide.json'