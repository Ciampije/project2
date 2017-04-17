var express = require('express');
var router = express.Router();
var Team = require('../models/teams.js');
var Players = require('../models/players.js');
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
		var commentIds = [];
		for(var i = 0; i <foundTeam.comments.length; i++){
			commentIds.push(foundTeam.comments[i]._id)
		}
		Comments.remove(
			{
				_id : {
					$in: commentIds
				}
			}, function(err, data){
				res.redirect('/teams');
			}
		);
	});
});

module.exports = router;
