/**
 * Created by artemvlasov on 22/04/15.
 */
var app = angular.module('main.directives',[]);
app.directive('setHeight', function() {
    return {
        restrict: 'C',
        compile: function(element, attrs) {
            var headerHeight = element[0].offsetParent.offsetHeight;
            var elementHeight = element[0].offsetHeight;
            var contentHeight = null;
            angular.forEach(element[0].offsetParent.children, function(element) {
                if(angular.equals(element.id, "content")) {
                    contentHeight = element.offsetHeight;
                }
            });
            var finalHeight = headerHeight - (contentHeight - elementHeight);
            element.css({'height': finalHeight, 'vertical-align': 'middle', 'display': 'table-cell'});
        }
    }
});