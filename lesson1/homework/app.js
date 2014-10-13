/**
 * Created on 11.10.14.
 */
/* Требуется по запросу GET - отдавать файл
	По запросу POST - записывать данные в файл
	Обрабатывать ошибки
 */
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime-types');
var url = require('url');

var server = new http.Server();

server.listen(3000);

server.on('request', function(req, res) {
	var urlPath = url.parse(req.url).pathname;
	console.log(req.url + ' ' + req.method);
	switch(req.method) {
		case 'GET':

			res.setHeader('Content-Type', mime.contentType(path.basename(urlPath)));
			var file = new fs.ReadStream(path.basename(req.url));

			file.pipe(res);

			file.on('error', function(err) {
				if (err.code == 'ENOENT') {
					res.statusCode = 404;
					res.end("File not found");
				} else {
					res.statusCode = 500;
					res.end("Unknown err");
				}
			});

			res.on('close', function() {
				file.destroy();
			});

			break;

		case 'POST':

			var file = new fs.WriteStream(path.basename(req.url));

			file.on('error', function(err) {
				console.log(err);
				res.statusCode = 500;
				res.end("Unknown ERR");
			});

			req.pipe(file);

			req.on('error', function(err) {
				console.log(err);
				file.destroy();
			}).on('close', function() {
				file.destroy();
			}).on('end', function() {
				res.statusCode = 200;
				res.end("Success!");
			});

			break;

		default:
			console.log('ERROR');
	}

})

