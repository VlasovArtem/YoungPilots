var app = angular.module('useful.controllers', ['ngMaterial']);

app.controller('UsefulThingsCtrl', ['usefulThings', '$scope', '$mdDialog',
    function (usefulThings, $scope, $mdDialog) {
        $scope.usefulThings = usefulThings;
        if (window.innerWidth <= 490) {
            $scope.ignore = true
        }
        $scope.informationUrl = 'app/useful-things-page/additional/information/information.html';
    }
]);