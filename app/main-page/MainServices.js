/**
 * Created by artemvlasov on 19/04/15.
 */
var services = angular.module('main.services', ['ngResource']);

services.factory('ContactsFactory', function($resource) {
    return $resource('app/content/contacts/:categories-contacts.json', {categories: '@categories'});
}).factory('BroadcastLive', function($resource) {
    return $resource('http://volksmusiknetradio.ice.infomaniak.ch/volksmusiknetradio-128.mp3');
}).factory('Broadcast', function($resource) {
    return $resource('app/content/broadcast-date.json');
}).factory('ConferencesFactory', function($resource) {
    return $resource('app/content/conferences/conferences.json');
}).factory('QuotesFactory', function($resource) {
    return $resource('app/content/quotes/quotes.json');
}).factory('ContentFactory', function($resource) {
    return $resource('app/content/:folder/:filename', {folder: '@folder', filename: '@filename'});
}).factory('Twitter', function($http, $resource, $base64) {
    var consumerKey = encodeURIComponent('mmI8aykPD9e3h0KY5vszFMGp7');
    var consumerSecret = encodeURIComponent('yIFRkLzBRRULvh4teuIw7txs2fKnZ5H9QVYDKHUU5fDRNCGiJm');
    var credentials = $base64.encode(consumerKey + ':' + consumerSecret);
    var twitterOauthEndpoint = $http.post(
        'https://api.twitter.com/oauth2/token',
        "grant_type=client_credentials",
        {headers: {
            'Authorization': 'Basic ' + credentials,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}

    );
    twitterOauthEndpoint.success(function(response) {
        services.$httpProvider.defaults.headers.common['Authorization'] = "Bearer " + response.access_token;
    }).error(function(data) {
        console.log(data);
    });
    return $resource('https://api.twitter.com/1.1/search/:action',
        {
            action: 'tweets.json',
            q: '#RazborPoletov',
            result_type: 'recent',
            count: 6
        }
    );
}).factory('TimeZoneFactory', function($resource) {
    //Required query param location=latitude,longitude
    return $resource('https://maps.googleapis.com/maps/api/timezone/json')
}).factory('LatLngFactory', function($resource) {
    //Required query param address
    return $resource('http://maps.googleapis.com/maps/api/geocode/json')
}).config(function($httpProvider) {
    services.$httpProvider = $httpProvider;
});