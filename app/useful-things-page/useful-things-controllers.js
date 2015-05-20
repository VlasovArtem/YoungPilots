var app = angular.module('useful.controllers', []);

app.controller('UsefulThingsCtrl', ['usefulThings', '$scope',
    function(usefulThings, $scope) {
        $scope.usefulThings = usefulThings;
        $scope.usefulThingsFilter = '';
        if(window.innerWidth <= 490) {
            $scope.ignore = true
        }
        $scope.usefulThingsFilter = '';
        $scope.changeFilter = function(tag) {
            $scope.usefulThingsFilter = {
                "text": tag,
                "tag": true
            };
        };
    }
]);