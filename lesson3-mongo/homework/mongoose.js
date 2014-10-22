/**
 * Created on 14.10.14.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test1');

module.exports = mongoose;