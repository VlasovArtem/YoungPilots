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
}).factory('TimeZoneFactory', function($resource) {
    //Required query param location=latitude,longitude
    return $resource('https://maps.googleapis.com/maps/api/timezone/json')
}).factory('LatLngFactory', function($resource) {
    //Required query param address
    return $resource('http://maps.googleapis.com/maps/api/geocode/json')
}).config(function($httpProvider) {
    services.$httpProvider = $httpProvider;
});