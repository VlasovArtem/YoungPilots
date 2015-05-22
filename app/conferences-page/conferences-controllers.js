
/**
 * Created by artemvlasov on 04/05/15.
 */
var app = angular.module('conference.controllers', []);

app.controller('ConferenceCtrl', ['conferences', '$scope', '$filter',
    function(conferences, $scope, $filter) {
        $scope.conferences = $filter("complete")(conferences);
        $scope.socialsImg = {
            "twitter": "style/image/socials/conference-socials/twitter-icon.png",
            "facebook": "style/image/socials/conference-socials/facebook-icon.png",
            "googleplus": "style/image/socials/conference-socials/google-plus-icon.png",
            "linkedin": "style/image/socials/conference-socials/linkedin-icon.png",
            "blog": "style/image/socials/conference-socials/blog-icon.png"
        };
        $scope.getDateMillis = function(conf) {
            return $filter('dateMillis')(conf.date.startDate, conf.date.timezone);
        };
    }
]);