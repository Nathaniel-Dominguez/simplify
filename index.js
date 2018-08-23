// Require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var passport = require('./config/passportConfig');
var session = require('express-session');

// Declare app variable
var app = express();

// Set and use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'abc',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Include controllers and routes
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));

// Define routes

// Home route
app.get('/', function(req, res) {
	res.render('home');
});


// HEY LISTEN NAVI
app.listen(3000, function() {
	console.log('Hey Listen! - Navi')
});