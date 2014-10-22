/**
 * Created on 14.10.14.
 *
 *  curl --data '{"name":"Egor","age":26}' 127.0.0.1:3000/user
 *  curl -X "DELETE" 127.0.0.1:3000/user/Egor
 *  curl 127.0.0.1:3000/user/Egor
 *
 */
var http = require('http');
var url = require('url');
var path = require('path');

var sendError = require('./sendError');
var User = require('./user');

module.exports = http.createServer(function(req, res) {
	if (url.parse(req.url).pathname.split(path.sep)[1] == 'user') {
		switch (req.method) {
			case 'POST':
				addUser(req, res);
				break;
			case 'GET':
				sendUser(url.parse(req.url).pathname.split(path.sep)[2], res);
				break;
			case 'DELETE':
				deleteUser(url.parse(req.url).pathname.split(path.sep)[2], res);
				break;
			default:
				sendError(405, res);
		}
	} else {
		sendError(400, res);
	}

});
//{"name":"Egor","age":26}

function addUser(req, res) {

	var data = '';

	req
		.on('readable', function() {
			data += req.read();
		})
		.on('end', function() {

			var user = new User(JSON.parse(data));

			user.save(function(err, user) {
				if (err) {
					if (err.name != "ValidationError") {
						console.log(err);
						sendError(err.code, res);
						return;
					}

					var response = {};
					for (var key in err.errors) {
						response[key] = err.errors[key].message;
					}

					console.log(response);
					sendError(err.name, res);
					return;
				}

				res.statusCode = 201;
				res.end('Created: '+ user);

			});
		});
}

function sendUser(userName, res) {
	User.find({name: userName}, function(err, user) {
		if (err) {
			console.log(err);
			sendError(err.code);
			return;
		}

		res.end(JSON.stringify(user));

	});
}

function deleteUser(userName, res) {
	User.remove({name: userName}, function(err, user) {
		if (err) {
			console.log(err);
			sendError(err.code);
			return;
		}

		res.end('Delete complete');
	})
}

