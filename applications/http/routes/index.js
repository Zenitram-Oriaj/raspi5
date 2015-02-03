var express = require('express');
var router = express.Router();

/*
router.use(function(req, res, next) {
	console.log(req);
	var settings = {
		"AccessControlAllowOrigin": req.headers.origin,
		"AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
		"AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
		"AccessControlAllowCredentials": true
	};

	res.header("Access-Control-Allow-Credentials", settings.AccessControlAllowCredentials);
	res.header("Access-Control-Allow-Origin",  settings.AccessControlAllowOrigin);
	res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
	res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : settings.AccessControlAllowMethods);

	next();
});
*/

router.options(/\.*/, function (req, res) {
	res.send(200);
});

router.get('/', function(req, res) {
	console.log(req);
  res.render('index');
});

module.exports = router;
