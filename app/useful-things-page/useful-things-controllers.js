/**
 * Created by artemvlasov on 17/05/15.
 */
define(['./useful-things-module.js'], function (usefulThings) {
    'use strict';
    usefulThings.controller('UsefulThinsCtrl', ['usefulThings', '$scope',
        function(usefulThings, $scope) {
            $scope.usefulThings = usefulThings;
            $scope.usefulThingsFilter = '';
        }
    ]);
});