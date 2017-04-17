var express = require('express');
var router = express.Router();
var Player = require('../models/players.js');
var Team = require('../models/teams.js');
var Comments = require('../models/comments.js');

router.get('/', function(req, res){
	Comments.find({}, function(err, foundComments){
		res.render('comments/index.ejs', {
			comments: foundComments
		});
	})
});

router.get('/new', function(req, res){
	Team.find({}, function(err, foundTeams){
		res.render('comments/new.ejs', {
			teams: foundTeams
		});
	});
});

router.post('/', function(req, res){
	Team.findById(req.body.teamId, function(err, foundTeam){
		console.log(foundTeam);
		Comments.create(req.body, function(err, createdComments){
			foundTeam.comments.push(createdComments);
			foundTeam.save(function(err, savedTeam){
				res.redirect('/teams');
			})
		});
	});
});

router.get('/:id', function(req, res){
	Comments.findById(req.params.id, function(err, foundComments){
		Team.findOne({'comments._id':req.params.id}, function(err, foundTeam){
			res.render('comments/show.ejs', {
				Team: foundTeam,
				comments: foundComments
			});
		});
	});
});

router.delete('/:id', function(req, res){
	Comments.findByIdAndRemove(req.params.id, function(){
		Team.findOne({'comments._id': req.params.id}, function(err, foundTeam){
			foundTeam.comments.id(req.params.id).remove();
			foundTeam.save(function(err, savedTeam){
				res.redirect('/comments');
			});
		});
	});
});

router.get('/:id/edit', function(req, res){
	Comments.findById(req.params.id, function(err, foundComments){
		res.render('comments/edit.ejs', {
			comments: foundComments
		});
	});
});

router.put('/:id', function(req, res){
	Comments.findByIdAndUpdate(req.params.id, req.body,{new:true}, function(err, updatedComments){
		Team.findOne({'comments._id': req.params.id}, function(err, foundTeam){
			foundTeam.comments.id(req.params.id).remove();
			foundTeam.comments.push(updatedComments);
			foundTeam.save(function(err, data){
				res.redirect('/comments');
			});
		});
	});
});

module.exports = router;
