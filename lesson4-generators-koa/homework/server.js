/**
 * Created on 15.10.14.
 */
var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var formidable = require('koa-formidable');

var mongoose = require('./mongoose');
var User = require('./user');

var app = module.exports = koa();

app.use(logger());
app.use(formidable());
app.use(route.get('/user/:id', sendUser));
app.use(route.post('/user', addUser));
app.use(route.del('/user/:id', deleteUser));

function *addUser() {
	var str = JSON.stringify(this.request.body);
	str = str.substring(2, str.length-5);
	str = str.replace(/\\/g, '');
	var user = new User(JSON.parse(str));

	this.body = yield function(callback) {
		user.save(callback);
	}
}

function *sendUser(id) {
	this.body = yield User.find({name:id}).exec();
}

function *deleteUser(id) {
	if(yield User.remove({name:id}).exec()) this.body = 'User ' + id + ' has been deleted';
}


app.listen(3000);
