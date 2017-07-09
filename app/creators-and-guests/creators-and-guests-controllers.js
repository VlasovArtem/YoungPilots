/**
 * Created by artemvlasov on 29/06/2017.
 */
var app = angular.module('cag.controllers', []);

app.controller('CreatorsAndGuestsCtrl', ['creatorsAndGuests', 'podcastLinks', '$scope',
    function (creatorsAndGuests, podcastLinks, $scope) {
        $scope.creatorsAndGuests = creatorsAndGuests;
        $scope.podcastLinks = podcastLinks;
        $scope.lastPodcast = getLastPodcastNumber();
        function getLastPodcastNumber() {
            var maxNumbers = [];
            _.each(creatorsAndGuests, function (cag) {
                maxNumbers.push(_.max(cag.appearanceEpisodeNumbers, function (number) {
                    return number;
                }))
            });
            return _.max(maxNumbers, function (maxNumber) {
                return maxNumber;
            });
        }

        $scope.setSelectedPodcastNumber = function (number) {
            $scope.selectedPodcastNumber = number;
        };

        $scope.informationUrl = 'app/creators-and-guests/additional/information/information.html';

    }
]);