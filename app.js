var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	Configuration = require('./src/Configuration'),
	ExpressServer = require('./src/http/ExpressServer');

function app() {
	this.config = null;
	this.server = null;
}

app.prototype.init = function() {
	this.config = new Configuration.load(__dirname);
	this.server = new ExpressServer(this.config, express).create();
	this._setting();
	return this.server;
};

app.prototype._setting = function() {
	this.server.use(logger('dev'));
	this.server.use(bodyParser.json());
	this.server.use(bodyParser.urlencoded({ extended: false }));
	this.server.use(cookieParser());
	this.server.use(require('less-middleware')(path.join(__dirname, this.config.getViewPath())));

	this.server.set('views', path.join(__dirname, '../../' + this.config.getViewPath()));
	var cons = require('consolidate');
	this.server.engine('html', cons.mustache);
	this.server.set('view engine', 'html');

	this.server.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// development error handler
	if (this.server.get('env') === 'development') {
		this.server.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	this.server.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});

};

app.prototype.normalizePort = function() {
	var val = process.env.PORT || this.config.getPort();
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
};

module.exports = app;
