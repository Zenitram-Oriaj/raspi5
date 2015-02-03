var fs = require('fs');
var cfg = JSON.parse(fs.readFileSync(__dirname + "/config/config.json"));

var server = require('child_process');
var http = {};
var pi = {};

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

function PiService() {
	pi = server.fork(__dirname + "/applications/pi");

	pi.on('exit', function () {});

	pi.on('message', function (msg) {});

	pi.send(msg);
}

HttpService();
PiService();

process.on('exit', function () {
	http.kill();
	pi.kill();
});