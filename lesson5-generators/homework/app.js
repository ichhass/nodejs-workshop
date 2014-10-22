/**
 * Created on 16.10.14.
 */
var koa = require('koa');
var router = require('koa-router');
var Logger = require('koa-logger');
var serve = require('koa-static');
var views = require('koa-views');
var formidable = require('koa-formidable');
var session = require('koa-generic-session');
var bunyan = require('bunyan');

var User = require('./user');
var mongoose = require('./mongoose');


var app = koa();

app.use(Logger());

app.use(function* (next) {

	this.requestID = Math.random();

	this.log = bunyan.createLogger({
		name: 'app',
		requestID: this.requestID,
		stream: process.stdout,
		level: 'info'
	});

	try {
		yield* next;
	} catch (e) {
		this.body = 'Error: ' + e;
	}
});

app.use(serve('public'));

app.keys = ['secret'];

app.use(session());

app.use(views('views', {
	default: 'jade'
}));

app.use(formidable());

app.use(router(app));

app.get('/', function* () {
	if(this.session.login) {
		this.body = 'hi ' + this.session.login
	} else {
		this.body = 'hi ' + 'anonimus';
	}
});

app.get('/register', function* () {
	yield this.render('register');
});

app.post('/register', function* () {
	console.log(this.request.body);
	var newUser = {
		login: this.request.body.login,
		password: this.request.body.password
	};
	console.log(this.request.body.login);
	console.log(newUser);
	var user = new User(newUser);

	this.body = yield function(callback) {
		user.save(callback);
	}
});

app.get('/auth', function* () {
	yield this.render('auth');
});

app.post('/auth', function* () {

	auth = yield User.find({login: this.request.body.login}).select('login password').exec();

	if(auth[0].password == this.request.body.password) {
		this.session.login = this.request.body.login;
	}

	this.redirect('/');

});

app.listen(3000, function() {
	console.log('Server has started');
})