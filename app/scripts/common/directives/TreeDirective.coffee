angular.module('myAwesomeApp').directive 'tree', ->
    restrict :  'E'
    template : '<ol><tree-option ng-repeat="item in data"></tree-option></ol>'

    scope    :
        data : '='

angular.module('myAwesomeApp').directive 'treeOption', ($compile) ->
    restrict : 'E'
    template : '<li><h4><a href="javascript:void(0);" ng-click="toggleVisibility(doc)">{{ item.title }}</a></h4></li>'

    link  : (scope, element, attrs) ->

        # Toggle visibility an item content.
        scope.toggleVisibility = (obj) ->
            scope.isVisible = !scope.isVisible

        # Append text if the content is plain text.
        if angular.isString scope.item.content
            element.find('li').append $compile('<markdown text="{{ item.content }}" ng-show="isVisible"></markdown>')(scope)

        # Append a new tree if the content is an object.
        else if angular.isObject scope.item.content
            element.find('li').append $compile('<tree data="item.content" ng-show="$parent.isVisible"></tree>')(scope)