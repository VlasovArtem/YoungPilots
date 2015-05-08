/**
 * Created by artemvlasov on 08/05/15.
 */
var app = angular.module('main.filters',[]);

app.filter('userDate', function($filter) {
    return function(date, content) {
        return $filter('date')($filter('convertDate')(date, content.offset), content.format);
    }
});
app.filter('convertDate', function() {
    return function(date, offset) {
        var timezone = [];
        timezone.push(offset < 0 ? "-" : "+");
        timezone.push("0");
        timezone.push(offset < 0 ? -(offset) : offset);
        timezone.push("00");
        var fullDate = [];
        fullDate.push(date.date);
        fullDate.push(date.time);
        fullDate.push(timezone.join(""));
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
        var convertedDate = $filter('convertDate')(conf.startDate, conf.timezoneOffset);
        return $filter('date')(convertedDate, format);
    }
});
app.filter('confEndDate', function($filter) {
    return function(conf, format) {
        var convertedDate = $filter('convertDate')(conf.endDate, conf.timezoneOffset);
        return $filter('date')(convertedDate, format);
    }
});