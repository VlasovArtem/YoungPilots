/**
 * Created by artemvlasov on 22/04/15.
 */
var app = angular.module('main.directives',[]);
app.directive('align', function() {
    return {
        restrict: 'A',
        compile: function(element, attrs) {
            console.log(element);
            var verticalAlignAttrs = ["baseline", "bottom", "middle", "sub", "super", "text-bottom", "text-top", "top", "inherit"];
            var align = _.contains(verticalAlignAttrs, attrs['align']) ? attrs['align'] : "baseline";
            var headerHeight = element[0].offsetParent.offsetHeight;
            var allContentHeight = null;
            var contentHeight = element[0].offsetHeight;
            for(var i = 0; i < element[0].offsetParent.children.length; i++) {
                if(!_.isEqual(element[0].offsetParent.children[i].className, 'parallax-overlay')) {
                    allContentHeight += element[0].offsetParent.children[i].offsetHeight;
                }
            }
            var finalHeight = (headerHeight - allContentHeight) + contentHeight;
            element.css({'height': finalHeight, 'vertical-align': align, 'display': 'table-cell'});
        }
    }
});
app.directive('broadcast', function($timeout, BroadcastLive, $route, Broadcast) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var timeoutMillis = 60 * 1000;
            var broadcastUtcTime,
                localUtcTime;
            var getUTCTime = function(time, offset) {
                return time + (offset * 60000)
            };
            var getBroadcastData = function() {
                Broadcast.get(function(broadcastData) {
                    scope.broadcastData = broadcastData;
                    scope.broadcastDate = new Date(broadcastData.date.year, broadcastData.date.month - 1, broadcastData.date.day, broadcastData.date.hour, 0, 0, 0);
                    broadcastUtcTime = getUTCTime(scope.broadcastDate.getTime(),
                        broadcastData.timezoneOffsetFromUTCInMinutes);
                }, function() {
                    throw new Error("Broadcast file is not available");
                });
            };
            getBroadcastData();
            var dateDiff = function(returnFormat) {
                if(_.isNull(broadcastUtcTime) || _.isUndefined(broadcastUtcTime)) {
                    throw new Error("Broadcast date is undefined");
                }
                var formats = [
                    ["d", "day", "days"],
                    ["h", "hour", "hours"],
                    ["m", "minute", "minutes"],
                    ["s", "second", "seconds"]];
                var correctFormat = null;
                _.some(formats,
                    function (format) {
                        if (_.contains(format, returnFormat)) {
                            correctFormat = format[1];
                            return true;
                        }
                        return false;
                    }
                );
                var diff = broadcastUtcTime - localUtcTime;
                var leftTime = null;
                switch (correctFormat) {
                    case 'day':
                        var dayInMillis = 24 * 60 * 60 * 1000;
                        leftTime = diff / dayInMillis;
                        break;
                    case 'hour':
                        var hourInMillis = 60 * 60 * 1000;
                        leftTime = diff / hourInMillis;
                        break;
                    case 'minute':
                        var minuteInMillis = 60 * 1000;
                        leftTime = diff / minuteInMillis;
                        break;
                    case 'second':
                        var secondInMillis = 1000;
                        leftTime = diff / secondInMillis;
                        break;
                }
                return leftTime
            };
            var broadcastLiveTimeout = true;
            var checkLeftTime = function() {
                if(dateDiff('d') <= 1 && dateDiff('h') > 3) {
                    timeoutMillis = 3 * 60 * 60 * 1000;
                } else if(dateDiff('h') <= 3 && dateDiff('m') > 60) {
                    timeoutMillis = 60 * 60 * 1000;
                } else if(dateDiff('m') <= 60 && dateDiff('m') > 10) {
                    timeoutMillis = 10 * 60 * 1000;
                } else if(dateDiff('m') <= 10 && dateDiff('s') > 0) {
                    timeoutMillis = 60 * 1000;
                } else if(dateDiff('s') <= 0) {
                    BroadcastLive.get(function() {
                        element.addClass('live');
                        $timeout.cancel(timeout);
                        timeoutMillis = 60 * 1000;
                        broadcastLiveTimeout = false;
                        newBroadcastDateTimeout = $timeout(newBroadcastDate, 2 * 60 * 60 * 1000);
                        console.log(timeoutMillis + ' (default: 86400000');
                    }, function() {
                        if(dateDiff('m') < -60) {
                            broadcastUtcTime = null;
                            timeout = $timeout(newDate, 60 * 60 * 1000);
                            broadcastLiveTimeout = false;
                            console.log(new Date(localUtcTime) + ' - Broadcast is not starting')
                        }
                    });
                } else {
                    timeoutMillis = 24 * 60 * 60 * 1000;
                    console.log('One day millis');
                }
            };
            var newBroadcastDate = function() {
                console.log('New broadcast date timeout');
                BroadcastLive.get(function() {}, function() {
                    $route.reload();
                });
                newBroadcastDateTimeout = $timeout(newBroadcastDate, 2 * 60 * 60 * 1000);
            };
            var newBroadcastDateTimeout = null;
            var newDate = function() {
                var newDate = new Date();
                localUtcTime = getUTCTime(newDate.getTime(), newDate.getTimezoneOffset());
                if(broadcastUtcTime < localUtcTime) {
                    scope.broadcastDate = null;
                    timeoutMillis = 2 * 60 * 60 * 1000;
                    getBroadcastData();
                } else {
                    checkLeftTime();
                }
                timeout = $timeout(newDate, timeoutMillis);
            };
            var timeout = $timeout(newDate, timeoutMillis);
        }
    };
});
app.directive('countdown', function($timeout) {
    return {
        restrict: 'C',
        scope: {
            countdownTime: '=',
            timezoneOffset: '@'
        },
        link: function(scope, element, attrs)
        {
            var futureDate = new Date(scope.countdownTime),
                futureTime = futureDate.getTime(),
                futureOffset = -((Number(scope.timezoneOffset) * 60) * 60000),
                futureUtcTime = futureTime - futureOffset;

            var currentDate = new Date(),
                currentTime = currentDate.getTime(),
                currentOffset = currentDate.getTimezoneOffset() * 60000,
                currentUtcTime = currentTime + currentOffset;
            var updateDate = function (date) {
                currentDate = date;
                currentTime = currentDate.getTime();
                currentOffset = currentDate.getTimezoneOffset() * 60000;
                currentUtcTime = currentTime + currentOffset;
            };
            var dayMillis = 24 * 60 * 60 * 1000,
                hourMillis = 60 * 60 * 1000,
                minuteMillis = 60 * 1000,
                secondMillis = 1000;
            var updateCountdown = function() {
                var diff = futureUtcTime - currentUtcTime;
                var leftDays = Math.floor(diff / dayMillis),
                    leftHours = Math.floor((diff - (leftDays * dayMillis)) / hourMillis),
                    leftMinutes = Math.floor((diff - (leftDays * dayMillis + leftHours * hourMillis)) / minuteMillis),
                    leftSeconds = Math.floor((diff - (leftDays * dayMillis + leftHours * hourMillis + leftMinutes * minuteMillis)) / secondMillis);
                scope.left = {
                    "day": leftDays,
                    "hour": leftHours,
                    "minute": leftMinutes,
                    "second": leftSeconds
                };

            };
            var countdown = function() {
                updateDate(new Date());
                updateCountdown();
                countdownTimeout = $timeout(countdown, secondMillis);
            };
            var countdownTimeout = $timeout(countdown, secondMillis);
        },
        template: '<span>Next conference: <i>Days: {{left.day}}, <span ng-if="left.hour < 10">0</span>{{left.hour}}:<span ng-if="left.minute < 10">0</span>{{left.minute}}:<span ng-if="left.second < 10">0</span>{{left.second}}</i></span>'
    }
});
app.directive('popup', function() {
    return {
        restrict: 'A',
        scope: {
            popupContent: '=',
            textContent: '@'
        },
        link: function(scope, element, attrs) {
            if(!angular.isUndefined(scope.popupContent) || !angular.isUndefined(scope.textContent)) {
                var data = scope.popupContent != null && (scope.popupContent.length > 110 || !angular.isUndefined(scope.textContent)) ? scope.popupContent : scope.textContent;
                if(!angular.isUndefined(data)) {
                    var options = {
                        content: data,
                        trigger: 'hover',
                        placement: 'bottom',
                        container: 'body'
                    };
                    $(element).popover(options);
                }
            }
        }
    }
});
