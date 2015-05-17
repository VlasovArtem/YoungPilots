/**
 * Created by artemvlasov on 07/05/15.
 */
define(['./conferences-module.js'], function (conferenceFilters) {
    'use strict';
    conferenceFilters.filter('matchDate', function($filter) {
        return function(confs, month) {
            return confs.filter(function(conf) {
                if(_.isUndefined(month)) {
                    return true;
                }
                var _date = $filter('confStartDate')(conf, 'MMM');
                return angular.equals(_date, month.value);
            })
        }
    });
});