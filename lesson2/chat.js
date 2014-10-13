/**
 * Created on 13.10.14.
 */

var clients = [];

exports.subscribe = function(req, res) {
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
	console.log("subscribe");

	clients.push(res);

	res.on('close', function() {
		clients.splice(clients.indexOf(res), 1);
	});
};

exports.publish = function(message) {
	console.log("publish '%s'", message);

	clients.forEach(function(res) {
		res.end(message);
	});

	clients = [];
};

exports.getClientsLength = function() {
	return clients.length;
}

setInterval(function() {
	console.log(clients.length);
}, 2000);