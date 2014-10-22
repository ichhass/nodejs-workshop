/**
 * Created on 13.10.14.
 */
var mongoose = require('./mongoose');

var schema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		require: true
	},
	email: {
		type: String,
		validate: [/^[a-zA-Z0-9._%+_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'invalid email address']
	},
	birthday: {
		type: Date
	},
	created: {
		type: Date,
			default: Date.now
	}
});

mongoose.model('User', schema);