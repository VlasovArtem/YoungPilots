/**
 * Created by artemvlasov on 09/05/15.
 */
var Twit = require('twit');
var io = require('../app').io;
var TWEETS_BUFFER_SIZE = 3;

var T = new Twit({
    consumer_key:         'mmI8aykPD9e3h0KY5vszFMGp7',
    consumer_secret:      'yIFRkLzBRRULvh4teuIw7txs2fKnZ5H9QVYDKHUU5fDRNCGiJm',
    access_token:         '1299479558-ERyDKcp6VeDKG6JFf2lv7CJ4RiWaTVhIbR7Cp0s',
    access_token_secret:  'V0fXF77KnmeCDttdmX37doKCRVMn96uaO5ldLecIg9bGs'
});

var stream = T.stream('statuses/filter', {
    "filter_level": "medium",
    "track": "#RazborPoletov",
    "count": 6
});
var tweetsBuffer = [];

stream.on('connect', function(request) {
    console.log('Connected to Twitter API');
});

stream.on('disconnect', function(message) {
    console.log('Disconnected from Twitter API. Message: ' + message);
});

stream.on('reconnect', function (request, response, connectInterval) {
    console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
});

stream.on('tweet', function(tweet) {
    if (tweet.place == null) {
        return ;
    }

    //Create message containing tweet + username + profile pic + location
    var msg = {};
    msg.text = tweet.text;
    msg.location = tweet.place.full_name;
    msg.user = {
        name: tweet.user.name,
        image: tweet.user.profile_image_url
    };

    //push msg into buffer
    tweetsBuffer.push(msg);

    //send buffer only if full
    if (tweetsBuffer.length >= TWEETS_BUFFER_SIZE) {
        //broadcast tweets
        io.sockets.emit('tweets', tweetsBuffer);
        tweetsBuffer = [];
    }
});