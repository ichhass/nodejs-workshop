/**
 * Created on 14.10.14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	age: {
		type: Number,
		validate: [/[0-9]/, 'invalid age']
	}
});

module.exports = mongoose.model('User', userSchema);