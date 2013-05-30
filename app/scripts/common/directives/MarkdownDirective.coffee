angular.module('myAwesomeApp').directive 'markdown', ->
    restrict :  'E'

    link     : (scope, element, attrs) ->
        converter = new Showdown.converter()
        element.html converter.makeHtml attrs.text