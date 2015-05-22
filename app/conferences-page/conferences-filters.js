/**
 * Created by artemvlasov on 07/05/15.
 */
var app = angular.module('conference.filters', []);

app.filter('matchDate', ["$filter", function($filter) {
    return function(confs, month) {
        return confs.filter(function(conf) {
            if(_.isUndefined(month)) {
                return true;
            }
            var _date = $filter('confStartDate')(conf, 'MMM');
            return angular.equals(_date, month.value);
        })
    }
}]);
app.filter('complete', ["$filter", function($filter) {
    return function(confs) {
        return confs.filter(function(conf) {
            var confStartDate = $filter("convertDate")(conf.date.startDate, conf.date.timezone);
            var currentDate = new Date();
            return confStartDate > currentDate;
        })
    }
}]);