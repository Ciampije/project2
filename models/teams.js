var mongoose = require('mongoose');
var Player = require('./players.js');
var Comments = require('./comments.js');

var teamSchema = mongoose.Schema({
    location: String,
	name: String,
    conference: String,
    record: String,
    championships: Number,
    img: String,
	players: [Player.schema],
    comments: [Comments.schema]
});

var team = mongoose.model('Team', teamSchema);

module.exports = team;
