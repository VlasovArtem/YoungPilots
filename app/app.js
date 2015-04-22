'use strict';

// Declare app level module which depends on views, and components
angular.module('youngPilots', [
    'ngRoute', 'main.controllers', 'main.services', 'main.directives'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/main-page/main-page.html',
            controller: 'MainCtrl'
        })
    }]);
