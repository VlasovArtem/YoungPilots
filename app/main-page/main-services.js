/**
 * Created by artemvlasov on 17/05/15.
 */
define(['./main-module.js'], function (main) {
    'use strict';
    main.factory('ContactsFactory', function($resource) {
        return $resource('app/content/contacts/:categories-contacts.json', {categories: '@categories'});
    });
    main.factory('BroadcastLive', function($resource) {
        return $resource('http://volksmusiknetradio.ice.infomaniak.ch/volksmusiknetradio-128.mp3');
    });
    main.factory('Broadcast', function($resource) {
        return $resource('app/content/broadcast-date.json');
    });
    main.factory('ConferencesFactory', function($resource) {
        return $resource('app/content/conferences/conferences.json');
    });
    main.factory('QuotesFactory', function($resource) {
        return $resource('app/content/quotes/quotes.json');
    });
    main.factory('ContentFactory', function($resource) {
        return $resource('app/content/:folder/:filename', {folder: '@folder', filename: '@filename'});
    });
});