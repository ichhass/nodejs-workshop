/**
 * Created on 14.10.14.
 */
var http = require('http');

function errorHandler(code, res) {
	switch (code) {
		case 400:
			res.statusCode = 400;
			res.end(http.STATUS_CODES[code]);
			break;
		case 405:
			res.statusCode = 405;
			res.end(http.STATUS_CODES[code]);
			break;
		case 11000:
			res.statusCode = 500;
			res.end(http.STATUS_CODES[code]);
			break;
		default:
			res.statusCode = 500;
			res.end('Error: ' + code);
	}
};

module.exports = errorHandler;


