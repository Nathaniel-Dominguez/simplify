var async = require('async');
var express = require('express');
var router = express.Router();
var db = require('../models');

// Route for displaying all tags
router.get('/', function(req, res) {
	db.tag.findAll().then(function(tags) {
		res.render('tags/index', { tags: tags });
	}).catch(function(err) {
		console.log(err);
		res.render('error');
	});
});

// Route for form for editing tags
router.get('/edit/:id', function(req, res) {
	db.tag.findById(req.params.id).then(function(foundTag) {
		res.render('tags/edit', { tag: foundTag });
	}).catch(function(err) {
		console.log(err);
		res.render('error');
	});
});

// Route for getting one tag page by :id
router.get('/:id', function(req, res) {
	db.tag.findOne({
		where: { id: req.params.id },
		include: [db.track]
	}).then(function(tag) {
		console.log(tag);
		res.render('tags/show', { tag: tag });
	});
});

// Put route for submiting tag edits
router.put('/:id', function(req, res) {
	res.send(req.body);
});

// Delete route for deleting a tag
router.delete('/:id', function(req, res) {
	db.tag.findOne({
		where: { id: req.params.id },
		include: [db.track]
	}).then(function(foundTag) {
		async.forEach(foundTag.tracks, function(t, done) {
			// Runs for each track
			// Remove the association from the join table
			foundTag.removeTrack(t).then(function() {
				done();
			});
		}, function() {
			// Runs when everything is done
			// Now that the references in the join table are gone, I can delete the tag
			db.tag.destroy({
				where: { id: req.params.id }
			}).then(function() {
				res.send('tag deleted');
			}).catch(function(err) {
				res.status(500).send('500 error');
			});
		});
	}).catch(function(err) {
		res.status(500).send('500 uhoh');
	});
});

module.exports = router;