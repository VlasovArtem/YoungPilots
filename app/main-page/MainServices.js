/**
 * Created by artemvlasov on 19/04/15.
 */
var services = angular.module('main.services', ['ngResource']);

services.factory('ContactsFactory', function($resource) {
    return $resource('app/content/contacts/:categories-contacts.json', {categories: '@categories'});
});
services.factory('BroadcastLive', function($resource) {
    return $resource('http://volksmusiknetradio.ice.infomaniak.ch/volksmusiknetradio-128.mp3');
});
services.factory('Broadcast', function($resource) {
    return $resource('app/content/broadcast-date.json');
});
services.factory('ConferencesFactory', function($resource) {
    return $resource('app/content/conferences/conferences.json');
});
services.factory('QuotesFactory', function($resource) {
    return $resource('app/content/quotes/quotes.json');
});
services.factory('ContentFactory', function($resource) {
    return $resource('app/content/:folder/:filename', {folder: '@folder', filename: '@filename'});
});