// Require express for routing
var express = require('express');

// Declare a new router
var router = express.Router();

// Define routes
router.get('/', function(req, res) {
	res.render('profile/index');
});

module.exports = router;