/**
 * Created by artemvlasov on 08/05/15.
 */
var app = angular.module('main.filters',[]);

app.filter('convertDate', function() {
    return function(date, offset) {
        var fullDate = [];
        fullDate.push(date.date);
        fullDate.push(date.time);
        fullDate.push(offset);
        return new Date(fullDate.join(" "));
    }
});
app.filter('dateMillis', function($filter) {
    return function(date, offset) {
        return $filter('convertDate')(date, offset).getTime();
    }
});
app.filter('confStartDate', function($filter) {
    return function(conf, format) {
        var convertedDate = $filter('convertDate')(conf.date.startDate, conf.date.timezone);
        return $filter('date')(convertedDate, format);
    }
});
app.filter('confEndDate', function($filter) {
    return function(conf, format) {
        var convertedDate = $filter('convertDate')(conf.date.endDate, conf.date.timezone);
        return $filter('date')(convertedDate, format);
    }
});