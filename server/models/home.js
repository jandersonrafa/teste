var mongoose = require('mongoose');

module.exports = mongoose.model('Home', {
	text : String,
	done : Boolean
});