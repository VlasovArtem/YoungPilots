/**
 * Created by artemvlasov on 02/05/15.
 */
var app = angular.module('useful.directives',[]);
app.directive('tagConverter', function() {
    return {
        restrict: 'A',
        scope: {
            tags: '='
        },
        replace: true,
        link: function(scope, element, attrs) {
            scope.tags.sort();
            scope.convertedTags = scope.tags.toString().replace(/,/g, function() {
                return ", ";
            });
        },
        template: '<td ng-bind="convertedTags"></td>'
    }
});
app.directive('sort', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var index = 0;
            var defaultData = null;
            var ascentClass = null;
            var descentClass = null;
            $http.get('app/content/configuration.json').success(function(data) {
                defaultData = data;
                ascentClass = data.ascentClass;
                descentClass = data.descentClass;
                if(attrs.init) {
                    index = 1;
                    scope.orderByTag = attrs.sort;
                    scope.order = data.order.desc;
                    element.addClass(descentClass);
                }
            });
            function sort() {
                index++;
                if (index % 2 == 0) {
                    scope.order = defaultData.order.asc;
                    element
                        .addClass(ascentClass)
                        .removeClass(descentClass);
                } else {
                    scope.orderByTag = attrs.sort;
                    scope.order = defaultData.order.desc;
                    element.addClass(descentClass);
                }
            }
            element.bind('click', function sortClick() {
                scope.$apply(sort);
            });
            scope.$watch('orderByTag', function(newValue) {
                if(attrs.sort != newValue) {
                    index = 0;
                    element
                        .removeClass(ascentClass)
                        .removeClass(descentClass);
                }
            })
        }
    }
});