// Require async for tags later
var async = require('async');
var express = require('express');
var router = express.Router();
var db = require('../models');

// Define routes
// Route for list of all music
router.get('/', function(req, res) {
	db.track.findAll().then(function(allTracks) {
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
router.get('/:id', function(req, res) {
	db.track.findOne({
		where: { id: req.params.id },
		include: [db.track, db.comment, db.tag]
	}).then(function(foundTrack) {
		db.user.findAll().then(function(allUsers) {
			res.render('tracks/show', { track: foundTrack, users: allUsers });
		}).catch(function(err) {
			console.log(err);
			res.render('error');
		});
	}).catch(function(err) {
		console.log(err);
		res.send('failed');
	});
});

// Route for posting an audio file / post
router.post('/', function(req, res) {
	if(req.body.userId > 0) {
		db.track.create(req.body).then(function(createdTrack) {
			// Parse tags (if there are any)
			var tags = [];
			if(req.body.tags) {
				tags = req.body.tags.split(',');
			}

			if(tags.length > 0) {
				// Loop through the tags, create one if needed, then add relation in join table
				async.forEach(tags, function(t, done) {
					// This code runs for each individual tag we need to add
					db.tag.findOrCreate({
						where: { name: t.trim() }
					}).spread(function(newTag, wasCreated) {
						createdTrack.addTag(newTag).then(function() {
							done();
						});
					});
				}, function() {
					// This code runs if everything passes
					res.redirect('/tracks/' + createdTrack.id);
				});
			} 
			else {
				res.redirect('/tracks/', + createdTrack.id);
			}
		}).catch(function(err) {
			console.log(err);
			res.render('error', { err: err });
		});
	}
	else {
		res.redirect('/tracks/new')
	}
});

module.exports = router;