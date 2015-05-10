'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('youngPilots', [
    'ngRoute', 'underscore', 'ui.bootstrap', 'base64',
    'main.controllers', 'main.directives', 'main.services', 'main.filters',
    'useful.controllers', 'useful.directives',
    'conference.controllers', 'conference.directives', 'conference.filters', 'conference.services'
]);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/main-page/main-page.html',
            controller: 'MainCtrl',
            resolve: {
                activeContacts: function(ContentFactory) {
                    return ContentFactory.query({folder: "contacts", filename: "active-contacts.json"}).$promise
                },
                usefulThings: function(ContentFactory) {
                    return ContentFactory.query({folder: "useful-things", filename: "useful-things.json"}).$promise
                },
                conferences: function(ContentFactory) {
                    return ContentFactory.query({folder: "conferences", filename: "conferences.json"}).$promise
                },
                quotes: function(ContentFactory) {
                    return ContentFactory.query({folder: "quotes", filename: "quotes.json"}).$promise
                }
            }
        }).when('/useful', {
            templateUrl: 'app/useful-things-page/useful-things-page.html',
            controller: 'UsefulThinsCtrl',
            resolve: {
                usefulThings: function(ContentFactory) {
                    return ContentFactory.query({folder: "useful-things", filename: "useful-things.json"}).$promise
                }
            }
        }).when('/conference', {
            templateUrl: 'app/conferences-page/conferences-page.html',
            controller: 'ConferenceCtrl',
            resolve: {
                conferences: function(ContentFactory) {
                    return ContentFactory.query({folder: "conferences", filename: "conferences.json"}).$promise
                }
            }
        }).otherwise({redirectTo: '/'})
    }
]);