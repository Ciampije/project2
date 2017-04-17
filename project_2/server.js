var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));

var teamsController = require('./controllers/teams.js');
app.use('/teams', teamsController);

var playersController = require('./controllers/players.js');
app.use('/players', playersController);

var commentsController = require('./controllers/comments.js');
app.use('/comments', commentsController);


app.get('/', function(req, res){
	res.render('index.ejs');
});

mongoose.connect('mongodb://localhost:27017/project2');

mongoose.connection.once('open', function(){
	console.log('connected to mongo');
});

app.listen(3000, function(){
	console.log('listening....');
});
