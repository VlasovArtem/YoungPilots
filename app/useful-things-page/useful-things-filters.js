/**
 * Created by artemvlasov on 12/05/15.
 */
var app = angular.module('useful.filters',[]);

app.filter('utFilter', function() {
    return function(uts, data) {
        if (data !== '' && !_.isUndefined(data) && !_.isNull(data)) {
            var regex;
            if(data.tag) {
                regex = new RegExp("\\b"+data.text+"\\b", 'i');
                return _.filter(uts, function(ut) {
                    return _.some(ut.tags, function(tag) {
                        return tag.search(regex) > -1;
                    });
                })
            } else if(data.podcastNumber) {
              return _.filter(uts, function (ut) {
                  return ut.podcastId === parseInt(data.text);
              })
            } else {
                regex = new RegExp(data.text, 'i');
                return _.filter(uts, function (ut) {
                    return filterName(ut, regex)
                        || filterDescription(ut, regex)
                        || filterTags(ut, regex)
                        || filterPodcastId(ut);
                });
            }
        }
        return uts;

        function filterName(usefulThing, regex) {
            return filterData(usefulThing, regex, 'name');
        }

        function filterDescription(usefulThing, regex) {
            return filterData(usefulThing, regex, 'description');
        }

        function filterTags(usefulThing, regex) {
            return _.some(usefulThing.tags, function (tag) {
                return tag.search(regex) > -1;
            })
        }

        function filterPodcastId(usefulThing) {
            return usefulThing.podcastId === parseInt(data.text);
        }

        function filterData(usefulThing, regex, fieldName) {
            if (!_.isNull(usefulThing[fieldName])) {
                return usefulThing[fieldName].search(regex) > -1;
            }
            return false;
        }
    }
});