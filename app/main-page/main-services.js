/**
 * Created by artemvlasov on 19/04/15.
 */
var services = angular.module('main.services', ['ngResource']);

services.factory('ContactsFactory', ["$resource", function($resource) {
    return $resource('app/content/contacts/:categories-contacts.json', {categories: '@categories'});
}]).factory('BroadcastLive', ["$resource", function($resource) {
    return $resource('http://stardust.wavestreamer.com:8062/live/;stream/1');
}]).factory('Broadcast', ["$resource", function($resource) {
    return $resource('app/content/broadcast-date.json');
}]).factory('ConferencesFactory', ["$resource", function($resource) {
    return $resource('app/content/conferences/conferences.json');
}]).factory('QuotesFactory', ["$resource", function($resource) {
    return $resource('app/content/quotes/quotes.json');
}]).factory('ContentFactory', ["$resource", function($resource) {
    return $resource('app/content/:folder/:filename', {folder: '@folder', filename: '@filename'});
}]);

services.factory('UsefulThingsLimit', function() {
    var initialWindowInnerWidth = window.innerWidth;
    var initialUsefulThingsLimit = 20;
    return {
        getLimit: function() {
            if(initialWindowInnerWidth >= 850) {
                return initialUsefulThingsLimit;
            } else if(initialWindowInnerWidth >= 590 && initialWindowInnerWidth < 850) {
                return initialUsefulThingsLimit/2
            } else {
                return (initialUsefulThingsLimit/2)/2
            }
        }
    }
});