/**
 * Created by artemvlasov on 19/04/15.
 */
var app = angular.module('main.controllers', ['ngCookies']);

app.controller('MainCtrl', ['$scope', '$http', 'ContactsFactory', function($scope, $http, ContactsFactory) {
    ContactsFactory.query({categories: 'active'},function(data) {
        $scope.activeContacts = data;
    }, function() {
        $scope.error = true;
    });
    $scope.socialIcons = [
        {"icon": "../style/image/socials/github.png"},
        {"icon": "../style/image/socials/twitter.png"},
        {"icon": "../style/image/socials/linkedin.png"}
    ];
}]);
