var fs = require('fs');
var cfg = JSON.parse(fs.readFileSync(__dirname + "/config/config.json"));

var server = require('child_process');
var http = {};

var msg = {
	type: 'init',
	data: cfg
};

function HttpService() {
	http = server.fork(__dirname + "/applications/http");

	http.on('exit', function () {});

	http.on('message', function (msg) {});

	http.send(msg);
}

HttpService();