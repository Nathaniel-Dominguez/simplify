// Require .env variables
require('dotenv').config();

// Require needed modules
var passport = require('passport')
var passportFacebookStrategy = require('passport-facebook').Strategy;
var passportLocalStrategy = require('passport-local').Strategy;

// Declare variables
var db = require('../models');

// Provide serialize/deserialize functions for session
passport.serializeUser(function(user, callback) {
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
	db.user.findById(id).then(function(user) {
		callback(null, user);
	}).catch(function(err) {
		callback(err, null);
	});
});

// Do the actual logging in with passport-local
passport.use(new passportLocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, callback) {
	db.user.findOne({
		where: { email: email }
	}).then(function(foundUser) {
		if(!foundUser || !foundUser.isValidPassword(password)) {
			callback(null, null);
		}
		else {
			callback(null, foundUser);
		}
	}).catch(function(err) {
		callback(err, null);
	})
}));

// Do the login from facebook with passport-facebook
passport.use(new passportFacebookStrategy({
	clientID: process.env.FB_APP_ID,
	clientSecret: process.env.FB_APP_SECRET,
	callbackURL: process.env.BASE_URL + '/auth/callback/facebook', 
	profileFields: ['id', 'email', 'displayName'],
	enableProof: true
}, function(accessToken, refreshToken, profile, done) {
	// See if we have an email address we can use for identifying a user 
	// Either we get the email or the return is null
	var facebookEmail = profile.emails ? profile.emails[0].value : null;

	// See if the email already exists in the user table
	// If it doesn't exist we sign them up as a first time user
	// It does exist but they haven't logged in with facebook
	// or they have logged in and it does exist and they've logged with facebook and just need a new token
	db.user.findOne({
		where: { email: facebookEmail }
	}).then(function(existingUser) {
		if(existingUser && facebookEmail) {
			// This user is a returning user - update facebookId and token
			existingUser.updateAttributes({
				facebookId: profile.id,
				facebookToken: accessToken
			}).then(function(updatedUser) {
				done(null, updatedUser);
			}).catch(done);
		}
		else {
			// The person is a new user, so create a new entry for them in the users table
			// Parse the users name
			var usernameArr = profile.displayName.split(' ');

			db.user.findOrCreate({
				where: { facebookId: profile.id },
				defaults: {
					facebookToken : accessToken,
					email: facebookEmail,
					firstname: usernameArr[0],
					lastname: usernameArr[usernameArr.length - 1],
					admin: false,
					image: 'https://png.icons8.com/ios/1600/person-female-filled.png',
					dob: profile.birthday
				}
			}).spread(function(user, wasCreated) {
				if(wasCreated) {
					// this was expected, aya clap
					done(null, user);
				}
				else {
					// this user isn't new after all. This could happen if user-
					// - changed their email on facebook since last login
					user.facebookToken = accessToken;
					user.email = facebookEmail;
					user.save().then(function(updatedUser) {
						done(null, updatedUser)
					}).catch(done);
				}
			});
		}
	});
}));

module.exports = passport;