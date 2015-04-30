var log4js = require('log4js'),
	_path = require('path'),
	fs = require('fs');

function getConsoleAppender(level) {
	return {
		type: 'logLevelFilter',
		level: level || 'DEBUG',
		appender: {
			type: 'console'
		}
	};
}

// Initial default config that only logs to the console.
log4js.configure({
	appenders: [getConsoleAppender()]
});

/**
 * Return the correct logger object for a file.
 * @param {String} filename
 * @return {object} A usable logger.
 */
exports.getLogger = function(filename) {
	return log4js.getLogger(_path.basename(filename, '.js'));
};

exports.configure = function (logConfig) {
	log4js.loadAppender('file');

	var logPath = logConfig.path;
	if (logPath[0] !== '/') {
		var basedir = _path.resolve(__dirname, '../../../');
		logPath = _path.resolve(basedir, logPath);

	}
	var logLevel = logConfig.level || 'DEBUG';
	console.log('Logging to %s with level %s', logPath, logLevel);

	if (!fs.existsSync(logPath)) {
		fs.mkdirSync(logPath);
	}

	// More complex config that replaces the default one once we know the settings to use.
	log4js.configure({
		appenders: [
			getConsoleAppender(logLevel),
			{
				// The path is relative to log4js.js in node_modules
				type: '../../../src/lib/logging/SentryAppender'
			}, {
				type: '../../../src/lib/logging/MetricsAppender'
			}, {
				type: 'file',
				filename: logPath + '/auditentries.log',
				category: REQUEST_LOG,
				layout: {
					type: 'messagePassThrough'
				}
			}, {
				type: 'logLevelFilter',
				level: logLevel,
				appender: {
					type: 'file',
					filename: logPath + '/node-server.log'
				}
			}
		]
	});
};
