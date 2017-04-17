var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/basketball_app';
var port = process.env.PORT || 3000;


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

mongoose.connect(mongoUri);

mongoose.connection.once('open', function(){
	console.log('connected to mongo');
});

app.listen(port);
console.log('---------------------------------');
console.log('Server running on port: ' + port);
console.log('---------------------------------');
