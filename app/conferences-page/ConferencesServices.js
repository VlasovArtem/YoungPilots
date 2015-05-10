/**
 * Created by artemvlasov on 08/05/15.
 */
var services = angular.module('conference.services', ['ngResource']);

services.factory('ConferenceCityCoordinates', ['$q',
    function($q) {
        var factory = {
            getCoordinates: function(city) {
                var deferred = $q.defer();
                deferred.resolve(LatLngFactory.get({
                    "address": scope.city
                }));
                return deferred;
            }
        };
        return factory;
    }
]);