/**
 * Created on 11.10.14.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');

var server = new http.Server();

var emit = server.emit;

server.emit = function(eventName) {
	console.log(eventName);
	emit.apply(this, arguments);
}

server.listen(3000, function(){
	console.log('Server has started');
});

var config = {
	publicRoot: __dirname
};

server.on('request', function(req, res) {
	console.log('req.url: ' + req.url);
	var filename = path.basename(req.url);

	var content;

	try{
		content = fs.readFileSync(path.join(config.publicRoot, filename));
	} catch(e) {
		if (e.code == 'ENOENT') {
			res.statusCode = 404;
			res.end("File not fount");
		} else {
			res.statusCode = 500;
			res.end("Unknown error");
		}
		return;
	}

	res.end(content);
});

