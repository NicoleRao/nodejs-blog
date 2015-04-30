var _ = require('lodash'),
	bodyParser = require('body-parser'),
	path = require('path'),
	Logger = require('../lib/Logger');

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

ExpressServer.prototype.create = function () {
	var server = this.express();

	server.set('views', path.join(__dirname, '../../' + this.config.getViewPath()));

	var parser = bodyParser.json({limit: '50mb'});
	server.use(function (req, res, next) {
		if (_.contains(req.url, '/proxy/')) {
			next();
		} else {
			parser(req, res, next);
		}
	});

	var httpEntrypoint = require('./HttpEntrypointResource');
	server.use('/', httpEntrypoint);
	var cons = require('consolidate');
	server.engine('html', cons.mustache);
	server.set('view engine', 'html');

	return server;
};

module.exports = ExpressServer;
