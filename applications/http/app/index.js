var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('../routes');
var rootDir = path.resolve(__dirname, '..');

var app = express();

module.exports = function(cfg) {

	app.set('views', path.join(rootDir, 'views'));
	app.set('view engine', 'ejs');

	app.set('port', cfg.port);

	app.use(favicon(rootDir + '/public/logo.png'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.json({type: 'application/vnd.api+json'}));
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(cookieParser());
	app.use(express.static(path.join(rootDir, 'public')));

	app.use('/', routes);

	app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error:   {}
		});
	});

	return app;
};

