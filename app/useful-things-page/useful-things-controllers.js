var app = angular.module('useful.controllers', []);

app.controller('UsefulThinsCtrl', ['usefulThings', '$scope',
    function(usefulThings, $scope) {
        $scope.usefulThings = usefulThings;
        $scope.usefulThingsFilter = '';
    }
]);