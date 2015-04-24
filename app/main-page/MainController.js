/**
 * Created by artemvlasov on 19/04/15.
 */
var app = angular.module('main.controllers', ['ngCookies']);

app.controller('MainCtrl', ['broadcastDate', '$scope', '$http', '$timeout', '$route', 'ContactsFactory', function(broadcastDate, $scope, $http, $timeout, $route, ContactsFactory) {
    ContactsFactory.query({categories: 'active'},function(data) {
        $scope.activeContacts = data;
    }, function() {
        $scope.error = true;
    });
    $scope.broadcastData = broadcastDate;
    $scope.broadcastDate = new Date($scope.broadcastData.date.year, $scope.broadcastData.date.month - 1, $scope.broadcastData.date.day, $scope.broadcastData.date.hour, 0, 0, 0);
    $scope.socialIcons = {
        "github": "style/image/socials/github.png",
        "twitter": "style/image/socials/twitter.png",
        "linkedin": "style/image/socials/linkedin.png"
    };
}]);
