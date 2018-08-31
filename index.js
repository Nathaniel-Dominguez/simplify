// Require .env file's variables
require('dotenv').config();

// Require models
var db = require('./models');

// Require needed modules
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var flash = require('connect-flash')
var multer = require('multer');
var passport = require('./config/passportConfig');
var session = require('express-session');
var upload = multer({ dest: './uploads' });

// This makes the session use sequelize to write session data to a db table
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var sessionStore = new SequelizeStore({
	db: db.sequelize,
	expiration: 30 * 69 * 1000 // expire in  whenever
});

// Declare app variable
var app = express();

// Set and use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: sessionStore
}));
sessionStore.sync(); // creates the sessions table
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware - FUN!
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

// Include controllers and routes
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));
app.use('/tracks', require('./controllers/tracks'));

// Define routes

// Home route
app.get('/', function(req, res) {
	res.render('home');
});

// Error route
app.get('*', function(req, res) {
	console.log('wildcard route');
	res.render('error');
});

// Upload route for music to cloudinary
app.post('/tracks/new', upload.single('myFile'), function(req, res) {
	console.log('req.file.path:', req.file.path);
	cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'video' }, function(error, result) {
		console.log(result, error);
		res.render('/tracks/show', { url: result.secure_url });
	});
});

// HEY LISTEN NAVI
app.listen(process.env.PORT || 3000, function() {
	console.log('Hey Listen! - Navi')
});