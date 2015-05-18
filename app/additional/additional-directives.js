/**
 * Created by artemvlasov on 17/05/15.
 */
var app = angular.module('additional.directives',[]);
app.directive('active', ["$location", function($location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            console.log()
            var url = $location.path().split('/')[1];
            element[0].lastChild.href.indexOf(url) > -1 ? element.addClass('active') : element.removeClass('active');
        }
    }
}]);