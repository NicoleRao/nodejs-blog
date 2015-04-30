var fs = require('fs'),
	_ = require('lodash');

function Configuration(data) {
	this.data = data;
}

Configuration.prototype = {
	getHostPath: function() {
		return this.data.host-path;
	},

	getAppPath: function() {
		return this.data.apppath;
	},

	getPort: function() {
		return this.data.port;
	},

	getViewPath: function() {
		return this.data.viewpath;
	}
};

Configuration.load = function (rootPath) {
	var defaults = JSON.parse(fs.readFileSync(rootPath + '/config.json'));

	return new Configuration(defaults);
};
//
//Configuration.loadWithPath = function(rootPath) {
//	var defaults = Configuration.load(rootPath).data;
//
//	var localConfigPath = rootPath + '/config.json';
//
//	if (fs.existsSync(localConfigPath)) {
//		console.log('Reading local config from %s', localConfigPath);
//		var localConfig = JSON.parse(fs.readFileSync(localConfigPath));
//
//		return new Configuration(localConfig);
//	} else {
//		fs.writeFileSync(localConfigPath);
//		console.error('No local config available. It has now been generated in %s', localConfigPath);
//		console.error('Please edit file and restart');
//		return null;
//	}
//};

module.exports = Configuration;
