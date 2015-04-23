/**
 * Created by artemvlasov on 19/04/15.
 */
var app = angular.module('main.controllers', ['ngCookies']);

app.controller('MainCtrl', ['broadcastDate', '$scope', '$http', 'ContactsFactory', function(broadcastDate, $scope, $http, ContactsFactory) {
    ContactsFactory.query({categories: 'active'},function(data) {
        $scope.activeContacts = data;
    }, function() {
        $scope.error = true;
    });
    $scope.broadcastData = broadcastDate;
    $scope.broadcastDate = new Date(broadcastDate.date.year, broadcastDate.date.month - 1, broadcastDate.date.day, broadcastDate.date.hour, 0, 0, 0);
    $scope.socialIcons = {
        "github": "style/image/socials/github.png",
        "twitter": "style/image/socials/twitter.png",
        "linkedin": "style/image/socials/linkedin.png"
    };
}]);
