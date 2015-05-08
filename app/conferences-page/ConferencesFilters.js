/**
 * Created by artemvlasov on 07/05/15.
 */
var app = angular.module('conference.filters', []);

app.filter('matchDate', function($filter) {
    return function(confs, month) {
        return confs.filter(function(conf) {
            if(_.isUndefined(month)) {
                return true;
            }
            var _date = $filter('date')(new Date(conf.date.startDate), 'MMM');
            return angular.equals(_date, month.value);
        })
    }
});