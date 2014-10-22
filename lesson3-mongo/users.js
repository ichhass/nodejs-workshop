/**
 * Created on 13.10.14.
 */
var mongodb = require('mongodb');
var Server = mongodb.Server;
var Db = mongodb.Db;

var db = new Db('testbase', new Server("127.0.0.1", 27017), {w:1});

db.open(onOpen);

function onOpen(err) {
	if (err) throw err;

	var dbUsers = db.collection('users');
	dbUsers.remove(function() {});

	var users = [{
		username: "Egor",
		email: 'egor@mail.ru'
	},{
		username: "Dasha",
		email: 'dasha@mail.ru'
	},{
		username: "Fedor",
		email: 'fedor@mail.ru'
	}];

	var inserted = 0;

	users.forEach(function(user) {
		dbUsers.insert(user, function() {
			if (++inserted == users.length) onInsert();
		});
	});

	function onInsert(err, message) {
		dbUsers.find({}, onFind);
	}

	function onFind(err, cursor) {
		cursor.toArray(onCursorArray);
	}

	function onCursorArray(err, arr) {
		console.log(arr);
		db.close();
	}
}