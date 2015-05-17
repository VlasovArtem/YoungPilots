/**
 * Created by artemvlasov on 17/05/15.
 */
define(['./useful-things-module.js'], function (usefulThings) {
    'use strict';
    usefulThings.filter('utFilter', function() {
        return function(uts, data) {
            if (data != '' && !_.isUndefined(data) && !_.isNull(data)) {
                var regex = new RegExp(data, 'i');
                var content = _.filter(uts, function(ut) {
                    return ut.name.search(regex) > -1 || ut.description.search(regex) > -1 || _.some(ut.tags, function(tag) { return tag.search(regex) > -1});
                });
                return content;
            }
            return uts;
        }
    });
});