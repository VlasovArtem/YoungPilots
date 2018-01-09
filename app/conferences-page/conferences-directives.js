/**
 * Created by artemvlasov on 04/05/15.
 */
var app = angular.module('conference.directives',[]);

app.directive('socials', function() {
    return {
        restrict: 'A',
        scope: {
            socials: '=',
            socialsImg: '='
        },
        template: '<div class="conf-socials" ng-repeat="(social, url) in socials">' +
        '<a href="{{url}}" target="_blank">' +
        '<img class="img-circle" ng-src="{{socialsImg[social]}}" alt="{{social}}"/>' +
        '</a>' +
        '</div>'
    }
});
app.directive('searchConferenceForm', ["$filter", function($filter) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        link: function(scope) {
            var fullMonth = [
                {"label": "January", "value": "Jan"},
                {"label": "February", "value": "Feb"},
                {"label": "March", "value": "Mar"},
                {"label": "April", "value": "Apr"},
                {"label": "May", "value": "May"},
                {"label": "June", "value": "Jun"},
                {"label": "July", "value": "Jul"},
                {"label": "August", "value": "Aug"},
                {"label": "September", "value": "Sep"},
                {"label": "October", "value": "Oct"},
                {"label": "November", "value": "Nov"},
                {"label": "December", "value": "Dec"}
            ];
            scope.activeMonth = [];
            _.each(scope.conferences, function(conference) {
                var confMonth = $filter('confStartDate')(conference, 'MMMM');
                _.any(fullMonth, function(month) {
                    if(month.label === confMonth && !_.contains(scope.activeMonth, month)) {
                        scope.activeMonth.push(month);
                        return true
                    }
                    return false
                })
            });
        },
        templateUrl: 'app/conferences-page/additional/search-conference-form.html'
    }
}]);
