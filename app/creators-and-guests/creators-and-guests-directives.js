/**
 * Created by artemvlasov on 08/07/2017.
 */
var app = angular.module('cag.directives', ['ngMaterial']);


app.directive('cagContact', [ '$mdDialog', '$rootScope', '$timeout', function ($mdDialog, $rootScope, $timeout) {
    return {
        restrict: 'E',
        scope: {
            selectedPodcastNumber: '=',
            user: '=',
            podcastLinks: '=',
            showFullData: '='
        },
        link: function (scope) {
            if (scope.showFullData === undefined || !scope.showFullData)
                scope.podcastLinksLimit = calculatePodcastLinksLimit(24.48, 6.85);
            else {
                var htmlElement = document.getElementsByTagName("html");
                var attributeNode = htmlElement[0].getAttributeNode("style");
                attributeNode.value = attributeNode.value.replace("overflow-y: scroll;", "");
                htmlElement[0].setAttributeNode(attributeNode);
                scope.podcastLinksLimit = scope.user.totalAppearance;
            }
            scope.totalAppearanceAppender = getTotalAppearanceAppender();
            function calculatePodcastLinksLimit(defaultBadgeWidth, incrementBadgeWidthStep) {
                var elementWidthForCalculation = getElementWidth();
                var totalElementsOnWidth = 0;
                var counter = 0;
                while ((elementWidthForCalculation - getBadgetWidth()) - getBadgetWidth() > 0 && counter !== scope.user.totalAppearance) {
                    elementWidthForCalculation = elementWidthForCalculation - getBadgetWidth();
                    totalElementsOnWidth++;
                    counter++;
                }
                function getBadgetWidth() {
                    var number = scope.user.appearanceEpisodeNumbers[counter];
                    var numberOfExtends = 0;
                    while (number / 10 > 1) {
                        number = number / 10;
                        numberOfExtends++;
                    }
                    return defaultBadgeWidth + (incrementBadgeWidthStep * numberOfExtends);
                }
                if (scope.user.totalAppearance > totalElementsOnWidth) {
                    return totalElementsOnWidth - 1;
                } else {
                    return totalElementsOnWidth;
                }
            }

            function getTotalAppearanceAppender() {
                var totalAppearance = scope.user.totalAppearance;
                var totalAppearanceCalculation = totalAppearance % 10;
                if ((totalAppearanceCalculation === 2 || scope.user.totalAppearance === 3 || scope.user.totalAppearance === 4)
                    && (totalAppearance !== 12 && totalAppearance !== 13 && totalAppearance !== 15)) {
                    return "раза"
                } else {
                    return "раз"
                }
            }

            function getElementWidth() {
                var componentWidth = 0;
                if (parseInt(window.outerWidth) <= 1499) {
                    componentWidth = window.outerWidth / 2;
                } else {
                    componentWidth = window.outerWidth * (33.33333333 / 100);
                }
                //padding 30px more link 40px
                return componentWidth - 30 - 40;
            }

            scope.setSelectedPodcastNumber = function (number) {
                var elementById = document.getElementById("podcast_search_bar");
                var attribute = elementById.getAttributeNode("value");
                if (!attribute)
                    attribute = document.createAttribute("value");
                attribute.value = number;
                elementById.setAttributeNode(attribute);
                var searchData = document.getElementById("search-data");
                var text = searchData.getElementsByClassName("text");
                text[0].classList.remove("default");
                text[0].innerText = number;
                var menu = searchData.getElementsByClassName("menu");
                var values = menu[0].getElementsByTagName("div");
                _.each(values, function (value) {
                    if (value.classList.contains("selected")) {
                        value.classList.remove("selected", "active");
                    } else if (_.isEqual(parseInt(value.innerText), number)) {
                        value.classList.add("selected", "active");
                        $timeout(function () {
                            angular.element(value).triggerHandler("click");
                        });
                    }
                });
            };

            scope.setCheckSelectedPodcastNumberClass = function () {
                if (scope.selectedPodcastNumber === '' || _.isUndefined(scope.selectedPodcastNumber)) {
                    return "";
                } else if (_.contains(scope.user.appearanceEpisodeNumbers, parseInt(scope.selectedPodcastNumber))) {
                    return "selected-podcast";
                }
            };

            scope.showMore = function (ev) {
                $mdDialog.show({
                    templateUrl: 'app/creators-and-guests/additional/user-more.html',
                    parent: angular.element(document.body),
                    controller: ShowMoreCtrl,
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    locals: {
                        user: scope.user,
                        podcastLinks: scope.podcastLinks
                    }
                });
            };

            function ShowMoreCtrl(scope, user, podcastLinks) {
                scope.user = user;
                scope.podcastLinks = podcastLinks;
            }

        },
        templateUrl: 'app/creators-and-guests/directive/creators-and-guests-contact.html'
    }
}]);

app.directive('podcastSearch', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/creators-and-guests/additional/search-podcast-number.html'
    }
});