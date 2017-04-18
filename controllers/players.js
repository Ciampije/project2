var express = require('express');
var router = express.Router();
var Player = require('../models/players.js');
var Team = require('../models/teams.js');

router.get('/', function(req, res){
	Player.find({}, function(err, foundPlayers){
		res.render('players/index.ejs', {
			players: foundPlayers
		});
	})
});

router.get('/new', function(req, res){
	Team.find({}, function(err, foundTeams){
		res.render('players/new.ejs', {
			teams: foundTeams
		});
	});
});

router.post('/', function(req, res){
	Team.findById(req.body.teamId, function(err, foundTeam){
		console.log(foundTeam);
		Player.create(req.body, function(err, createdPlayer){
			foundTeam.players.push(createdPlayer);
			foundTeam.save(function(err, savedTeam){
				res.redirect('/players');
			})
		});
	});
});

router.get('/:id', function(req, res){
	Player.findById(req.params.id, function(err, foundPlayer){
		Team.findOne({'players._id':req.params.id}, function(err, foundTeam){
			res.render('players/show.ejs', {
				team: foundTeam,
				player: foundPlayer
			});
		});
	});
});

router.delete('/:id', function(req, res){
	Player.findByIdAndRemove(req.params.id, function(){
		Team.findOne({'players._id': req.params.id}, function(err, foundTeam){
			foundTeam.players.id(req.params.id).remove();
			foundTeam.save(function(err, savedTeam){
				res.redirect('/players');
			});
		});
	});
});

router.get('/:id/edit', function(req, res){
	Player.findById(req.params.id, function(err, foundPlayer){
		res.render('players/edit.ejs', {
			player: foundPlayer
		});
	});
});

router.put('/:id', function(req, res){
	Player.findByIdAndUpdate(req.params.id, req.body,{new:true}, function(err, updatedPlayer){
		Team.findOne({'players._id': req.params.id}, function(err, foundTeam){
			foundTeam.players.id(req.params.id).remove();
			foundTeam.players.push(updatedPlayer);
			foundTeam.save(function(err, data){
				res.redirect('/players');
			});
		});
	});
});


module.exports = router;
