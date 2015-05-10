/**
 * Created by artemvlasov on 09/05/15.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
//exports.io = io;


console.log('live-tweet-io started on port ' + server.address().port);

//Configuration
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});


var twitter = require('./config/twitter');