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

// Route for editing tags
router.get('/edit/:id', function(req, res) {
	db.tag.findById(req.params.id).then(function(foundTag) {
		res.render('tags/index', { tags: tags });
	}).catch(function(err) {
		console.log(err);
		res.render('error');
	});
});

// Route for getting one tag page by :id
