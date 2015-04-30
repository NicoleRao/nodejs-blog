var express = require('express')(),
	path = require('path');

express.get('/', function(req, res) {
	res.send('blog node server');
});

express.get('/blog', function(req, res) {
	res.sendFile(path.join(__dirname, '../../apps/views/', 'index.html'));
});

module.exports = express;
