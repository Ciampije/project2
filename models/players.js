var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
	name:String,
	position:String,
    number: Number,
    img: String
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;
