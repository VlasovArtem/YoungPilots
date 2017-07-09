var app = angular.module('cag.filters', []);

app.filter('filterLink', function() {
    return function(podcastNumber, podcastLinks) {
        var podcastLink = _.find(podcastLinks, function(podcastLink) {
            return podcastLink.podcastNumber === podcastNumber;
        });
        return podcastLink.link;
    }
});

app.filter('filterUsers', function () {
   return function (users, podcastNumber) {
       if (podcastNumber === '' || _.isUndefined(podcastNumber) || _.isNaN(podcastNumber)) {
           return users;
       } else {
           var newUserArray = [];
           _.each(users, function (user) {
               if (_.contains(user.appearanceEpisodeNumbers, parseInt(podcastNumber))) {
                   newUserArray.push(user);
               }
           });
           return newUserArray;
       }
   }
});

app.filter('range', function () {
   return function (input, total) {
       total = parseInt(total);
       for (var i=0; i <= total; i++) {
           input.push(i);
       }
       return input;
   } 
});

app.filter('filterSelectedPodcastNumber', function () {
    return function (numbers, selectedNumber) {
        if (selectedNumber === '' || _.isUndefined(selectedNumber) || _.isNaN(selectedNumber)) {
            return numbers
        }
        return _.filter(numbers, function (number) {
            return number === parseInt(selectedNumber);
        });
    }
});