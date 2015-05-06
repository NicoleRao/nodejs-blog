var HttpEntrypointResource = require('./HttpEntrypointResource');

/**
 * Utility for creating Express servers.
 *
 * @param [express]
 * @constructor
 */
function ExpressServer(config, express) {
	this.express = express || require('express');
	this.config = config;
}

ExpressServer.prototype.create = function() {
	var express = this.express();
	this._httpServer(express);
	return express;
};

ExpressServer.prototype._httpServer = function(express) {
	new HttpEntrypointResource().applyTo(express);
};

module.exports = ExpressServer;
