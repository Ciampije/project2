var mongoose = require('mongoose');

var commentsSchema = mongoose.Schema({
	title:String,
	body:String
});

var Comments = mongoose.model('Comment', commentsSchema);

module.exports = Comments;
