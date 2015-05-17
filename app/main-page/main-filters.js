/**
 * Created by artemvlasov on 17/05/15.
 */
define(['./main-module.js'], function (main) {
    'use strict';
    main.filter('convertDate', function() {
        return function(date, offset) {
            var fullDate = [];
            fullDate.push(date.date);
            fullDate.push(date.time);
            fullDate.push(offset);
            return new Date(fullDate.join(" "));
        }
    });
    main.filter('dateMillis', function($filter) {
        return function(date, offset) {
            return $filter('convertDate')(date, offset).getTime();
        }
    });
    main.filter('confStartDate', function($filter) {
        return function(conf, format) {
            var convertedDate = $filter('convertDate')(conf.date.startDate, conf.date.timezone);
            return $filter('date')(convertedDate, format);
        }
    });
    main.filter('confEndDate', function($filter) {
        return function(conf, format) {
            var convertedDate = $filter('convertDate')(conf.date.endDate, conf.date.timezone);
            return $filter('date')(convertedDate, format);
        }
    });
});