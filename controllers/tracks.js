// Require async for tags later
var async = require('async');
var express = require('express');
var router = express.Router();
var db = require('../models');

// Define routes
// Route for list of all music
router.get('/', function(req, res) {
	db.Track.findAll().then(function(allTracks) {
		res.render('tracks/index', { tracks: allTracks });
	}).catch(function(err) {
		console.log(err);
		res.send('no bueno');
	});
});

// Route for making a new music post
router.get('/new', function(req, res) {
	db.user.findAll().then(function(allUsers) {
		res.render('tracks/new', { users: allUsers });
	}).catch(function(err) {
		console.log(err);
		res.send('error');
	});
});

// Route for getting specific track


module.exports = router;