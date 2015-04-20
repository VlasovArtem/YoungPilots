'use strict';

// Declare app level module which depends on views, and components
angular.module('youngPilots', [
    'ngRoute', 'main.controllers', 'main.services'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'main-page/main-page.html',
            controller: 'MainCtrl'
        })
    }]);
