var koa = require('koa');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test1');

var User = require('./user');
var formidable = require('koa-formidable');

var app = module.exports = koa();

app.use(formidable());

app.use(function* () {
	// this (context)
	// this.request
	// this.response
	/*
	var users = yield User.find({}).exec(); // yield'ом возвращаем промис, который создает .exec(),
	сверху находится co, которое выполняет промисы
*/
/*
	var users = yield [
		User.find({name: "Egor" }).exec(),
		User.find({name: "Dasha"}).exec()
	];
	*/
	var users = yield function(callback) { //называется thunk
		User.find({}, callback);
	};

	this.set('Content-Type', 'application/json');
	this.body = users;

});

app.listen(3000);