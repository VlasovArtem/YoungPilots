'use strict';

var app = angular.module('youngPilots', [
    'ngRoute', 'underscore', 'ui.bootstrap',
    'main.controllers', 'main.directives', 'main.services', 'main.filters',
    'useful.controllers', 'useful.directives', 'useful.filters',
    'conference.controllers', 'conference.directives', 'conference.filters',
    'additional.directives'
]);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/main-page/main-page.html',
            controller: 'MainCtrl',
            resolve: {
                activeContacts: ["ContentFactory", function(ContentFactory) {
                    return ContentFactory.query({folder: "contacts", filename: "active-contacts.json"}).$promise
                }],
                usefulThings: ["ContentFactory", function(ContentFactory) {
                    return ContentFactory.query({folder: "useful-things", filename: "useful-things.json"}).$promise
                }],
                conferences: ["ContentFactory", function(ContentFactory) {
                    return ContentFactory.query({folder: "conferences", filename: "conferences.json"}).$promise
                }],
                quotes: ["ContentFactory", function(ContentFactory) {
                    return ContentFactory.query({folder: "quotes", filename: "quotes.json"}).$promise
                }]
            }
        }).when('/useful', {
            templateUrl: 'app/useful-things-page/useful-things-page.html',
            controller: 'UsefulThingsCtrl',
            resolve: {
                usefulThings: ["ContentFactory", function(ContentFactory) {
                    return ContentFactory.query({folder: "useful-things", filename: "useful-things.json"}).$promise
                }]
            }
        }).when('/conferences', {
            templateUrl: 'app/conferences-page/conferences-page.html',
            controller: 'ConferenceCtrl',
            resolve: {
                conferences: ["ContentFactory", function(ContentFactory) {
                    return ContentFactory.query({folder: "conferences", filename: "conferences.json"}).$promise
                }]
            }
        }).when('/about', {
            templateUrl: 'app/additional/about.html',
        }).otherwise({redirectTo: '/'})
    }
]);
