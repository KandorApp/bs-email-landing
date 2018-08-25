var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));
app.use(express.static('images'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/thanks', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/thanks.html'));
});

app.listen(8080);