/**
 * Created by artemvlasov on 22/04/15.
 */
var app = angular.module('main.directives',[]);
app.directive('align', function() {
    return {
        restrict: 'A',
        compile: function(element, attrs) {
            console.log(element);
            var verticalAlignAttrs = ["baseline", "bottom", "middle", "sub", "super", "text-bottom", "text-top", "top", "inherit"];
            var align = _.contains(verticalAlignAttrs, attrs['align']) ? attrs['align'] : "baseline";
            var headerHeight = element[0].offsetParent.offsetHeight;
            var allContentHeight = null;
            var contentHeight = element[0].offsetHeight;
            for(var i = 0; i < element[0].offsetParent.children.length; i++) {
                if(!_.isEqual(element[0].offsetParent.children[i].className, 'parallax-overlay')) {
                    allContentHeight += element[0].offsetParent.children[i].offsetHeight;
                }
            }
            var finalHeight = (headerHeight - allContentHeight) + contentHeight;
            element.css({'height': finalHeight, 'vertical-align': align, 'display': 'table-cell'});
        }
    }
});
app.directive('broadcast', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var broadcastDate = new Date(scope.broadcastDate);
            var broadcastTime = broadcastDate.getTime();
            var broadcastOffset = -((scope.broadcastData.timezoneOffset * 60) * 60000);
            scope.localDate = new Date();
            var localTime = scope.localDate.getTime();
            var localOffset = scope.localDate.getTimezoneOffset() * 60000;
            var diff = (broadcastTime - broadcastOffset) - (localTime - localOffset);
            var hourCountDown = diff / 3600000;
            var dayCountDown = hourCountDown / 24;
            var localDatePlus = (new Date().getTime()) + (1 * 60000);
            scope.$watch('localDate', function() {
                if(scope.localDate.getTime() >= localDatePlus) {
                    element.addClass('live');
                    $timeout.cancel(timeout);
                }
            });
            var newDate = function() {
                scope.localDate = new Date();
                timeout = $timeout(newDate, 15000);
            };
            var timeout = $timeout(newDate, 15000);
        }
    }
});