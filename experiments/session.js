/**
 * Created on 17.10.14.
 */
var session = require('koa-session');
var favicon = require('koa-favicon');
var koa = require('koa');
var app = koa();

app.use(favicon());

app.keys = ['some secret hurr'];
app.use(session());

app.use(function *(){
	var n = this.session.views || 0;
	this.session.views = ++n;
	this.body = n + ' views';
})

app.listen(3000);
console.log('listening on port 3000');