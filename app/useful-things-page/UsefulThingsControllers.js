var app = angular.module('useful.controllers', ['ngCookies']);

app.controller('UsefulThinsCtrl', ['usefulThings', '$scope',
    function(usefulThings, $scope) {
        $scope.usefulThings = usefulThings;
        $scope.usefulThingsFilter = '';
    }
]);