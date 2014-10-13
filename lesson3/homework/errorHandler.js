/**
 * Created on 14.10.14.
 */
function errorHandler(code, res) {
	switch (code) {
		case 400:
			res.statusCode = 400;
			res.end('Bad request');
			break;
		case 405:
			res.statusCode = 405;
			res.end('Method nott Allowed');
			break;
		case 11000:
			res.statusCode = 500;
			res.end('duplicate key error');
			break;
		default:
			res.statusCode = 500;
			res.end('Unknown error: ' + code);
	}
};

module.exports = errorHandler;


