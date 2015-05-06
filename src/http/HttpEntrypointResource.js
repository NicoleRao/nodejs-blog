var path = require('path');

function HttpEntrypointResource() {
}

HttpEntrypointResource.prototype.applyTo = function(express) {
	express.get('/', function(req, res) {
		res.send('blog node server');
	});

	express.get('/blog', function(req, res) {
		res.sendFile(path.join(__dirname, '../../apps/views/', 'index.html'));
	});
};

module.exports = HttpEntrypointResource;
