var fs = require('fs');

function Configuration(data) {
	this.data = data;
}

Configuration.prototype = {
	getHostPath: function() {
		return this.data.host;
	},

	getAppPath: function() {
		return this.data.apps;
	},

	getPort: function() {
		return this.data.port;
	},

	getViewPath: function() {
		return this.data.views;
	}
};

Configuration.load = function (rootPath) {
	var defaults = JSON.parse(fs.readFileSync(rootPath + '/config.json'));

	return new Configuration(defaults);
};

module.exports = Configuration;
