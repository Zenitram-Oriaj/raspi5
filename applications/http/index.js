var app = {};
var http = {};

function init(cfg){
	console.log(cfg);
	app = require('./app')(cfg);

	http = require('http').Server(app);
	http.listen(cfg.port);

	http.on('listening', function(){
		var addr = http.address();
		var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
		console.log('Listening on ' + bind);
	});

	http.on('error', onError);
}

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

///////////////////////////////////////////////////
// Process

process.on('disconnect', function () {
	console.log('Parent Closed Channel - Shutting Down Web Service');
	process.exit();
});

process.on('message', function (msg) {
	switch (msg.type) {
		case 'stop': {
			process.exit();
			break;
		}
		case 'restart': {
			break;
		}
		case 'init': {
			init(msg.data);
			break;
		}
		default: {
			break;
		}
	}
});

