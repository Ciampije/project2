var express = require('express');
var router = express.Router();
var Team = require('../models/teams.js');
var Player = require('../models/players.js');
var Comments = require('../models/comments.js');

router.get('/', function(req, res){
	Team.find({}, function(err, foundTeams){
		res.render('teams/index.ejs', {
			teams: foundTeams
		});
	})
});


router.post('/', function(req, res){
	Team.create(req.body, function(err, createdTeam){
		res.redirect('/teams');
	});
});

router.get('/new', function(req, res){
	res.render('teams/new.ejs');
});

router.get('/:id', function(req, res){
	Team.findById(req.params.id, function(err, foundTeam){
		res.render('teams/show.ejs', {
			team: foundTeam
		});
	});
});

router.delete('/:id', function(req, res){
	Team.findByIdAndRemove(req.params.id, function(err, foundTeam){
		var playerIds = [];
		for(var i = 0; i <foundTeam.players.length; i++){
			playerIds.push(foundTeam.players[i]._id)
		}
		Player.remove(
			{
				_id : {
					$in: playerIds
				}
			}, function(err, data){
				res.redirect('/teams');
			}
		);
	});
});

router.get('/:id/edit', function(req, res){
	Team.findById(req.params.id, function(err, foundTeam){
		res.render('teams/edit.ejs', {
			team: foundTeam
		});
	});
});

router.put('/:id', function(req, res){
	Team.findByIdAndUpdate(req.params.id, req.body, function(){
		res.redirect('/teams');
	});
});

module.exports = router;
