/**
 * Created by artemvlasov on 12/05/15.
 */
var app = angular.module('useful.filters',[]);

app.filter('utFilter', function() {
    return function(uts, data) {
        if (data != '' && !_.isUndefined(data) && !_.isNull(data)) {
            var regex;
            if(data.tag) {
                regex = new RegExp("\\b"+data.text+"\\b", 'i');
                return _.filter(uts, function(ut) {
                    return _.some(ut.tags, function(tag) {
                        return tag.search(regex) > -1;
                    });
                })
            } else {
                regex = new RegExp(data.text, 'i');
                return _.filter(uts, function (ut) {
                    return ut.name.search(regex) > -1 || ut.description.search(regex) > -1 || _.some(ut.tags, function (tag) {
                            return tag.search(regex) > -1;
                        });
                });
            }
        }
        return uts;
    }
});