/**
 * Created by artemvlasov on 19/04/15.
 */
var app = angular.module('main.controllers', []);

app.controller('MainCtrl', ['activeContacts', 'usefulThings', 'conferences', 'quotes', '$scope', '$filter', 'Broadcast',
    function(activeContacts, usefulThings, conferences, quotes, $scope, $filter, Broadcast) {
        $scope.usefulThings = usefulThings;
        $scope.activeContacts = activeContacts;
        $scope.conferences = conferences;
        $scope.quotes = quotes;
        Broadcast.get(function(data) {
            var broadcastDateMillis = $filter('dateMillis')(data.date.startDate, data.date.timezone);
            var currentDateMillis = new Date().getTime();
            $scope.broadcastData = broadcastDateMillis > currentDateMillis ? data : null;
        });
        $scope.socialIcons = {
            "github": "style/image/socials/github.png",
            "twitter": "style/image/socials/twitter.png",
            "linkedin": "style/image/socials/linkedin.png"
        };
        var initialUlLimit = 20;
        var initialContactsLimit = 6;
        var initialQuotesLimit = 12;
        $scope.utLimit = window.innerWidth < 590 ? initialUlLimit/2 : initialUlLimit;
        $scope.contacsLimit = window.innerWidth < 590 ? initialContactsLimit/2 : initialContactsLimit;
        $scope.quotesLimit = window.innerWidth < 590 ? initialQuotesLimit/2 : initialQuotesLimit;
        $scope.isComplete = function() {
            return function(query) {
                return !query.complete;
            }
        };
        $scope.getDateMillis = function(conf) {
            return $filter('dateMillis')(conf.date.startDate, conf.date.timezone);
        };
        $scope.filterTag = '';
        $scope.changeFilter = function(tag) {
            $scope.filterTag = tag;
        };
        $scope.checkTagLimit = function(tags) {
            if(tags.length < 5) {
                return 5;
            } else {
                var tagsLength = 0;
                var lastTagLength = 0;
                _.each(tags, function(tag, index) {
                    if(_.isEqual(index, tags.length - 1)) {
                        lastTagLength = tag.length;
                    }
                    tagsLength += tag.length;
                });
                if(tagsLength >= 25) {
                    return 4;
                } else {
                    return 5;
                }
            }
        };
    }
]);
