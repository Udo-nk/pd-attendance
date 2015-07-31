'use strict';

var express = require('express'),
    app     = express(),
    port    = process.env.PORT || 5000;

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile('./public/index.html');
});

app.listen(port, function() {
	console.log('The Lord is running on port ' + port);
});