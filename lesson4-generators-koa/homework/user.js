/**
 * Created on 15.10.14.
 */
var mongoose = require('./mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		validate:[
			{
				validator: function checkUnique(value, respond) {
					// User
					console.log('check unique');
					this.constructor.findOne({
						username: value,
						_id: { $ne: this._id }
					}, function(err, existingUser) {
						if (err) console.log('ERROR');
						console.log(existingUser);
						respond(existingUser ? false : true);
					});
				},
				msg: "Такое имя уже используется другим пользователем"
			}
		]
	},
	age: {
		type: Number,
		validate: [/[0-9]/, 'invalid age']
	}
});

module.exports = mongoose.model('User', userSchema);