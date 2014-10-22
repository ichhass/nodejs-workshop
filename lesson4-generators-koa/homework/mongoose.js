/**
 * Created on 15.10.14.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test1');

module.exports = mongoose;