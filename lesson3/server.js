/**
 * Created on 13.10.14.
 */
var mongoose = require('mongoose');
var User = require('user');

//var User = mongoose.models.User;

mongoose.models.User.remove({}, onRemove);

function onRemove() {
	var ilya = new User({ username: 'Ilya', email: 'ilya@mail.ru'});
	console.log(ilya);
	ilya.save(onSave);
}

function onSave(err, ilya, affected) {
	if (err) throw err;

	console.log(ilya);

	mongoose.disconnect();
}