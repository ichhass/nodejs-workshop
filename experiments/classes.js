/**
 * Created on 11.10.14.
 */
var Animal = function(name){
	this.name = name;
	this.cry();
	this.hi();
}

Animal.prototype.cry = function(){
	console.log('whoa!');
}

Animal.prototype.hi = function(){
	console.log('hi');
}

var a = new Animal('egor');

var Cat = function(name) {
	this.name = name;
	this.cry();
}

Cat.prototype = Animal.prototype;

Cat.prototype.cry = function(){
	console.log('meow');
}

var cat = new Animal('catty');

cat.hi();

