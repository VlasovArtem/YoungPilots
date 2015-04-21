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
    $scope.socialIcons = {
        "github": "style/image/socials/github.png",
        "twitter": "style/image/socials/twitter.png",
        "linkedin": "style/image/socials/linkedin.png"
    };
}]);
