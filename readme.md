# Simplify
Simple Spotify 

## Live Heroku Link

* https://simplify-audio.herokuapp.com/

## What it includes 

* Sequelize models and migration for user model
* Settings for postgresql 
* Passport and Passport-Local for authentication
* Express sessions to keep user logged in from page to page
* Connect-Flash for error/success messages 
* Bcrypt for hashing passwords

### User Model

| Column Name | SQL Type | Notes |
| ----------- | -------- |--------------------------------- |
| id | Integer| serial primary key |
| createdAt | Date | automatically generated |
| updatedAt | Date | automatically generated |
| firstname | String | - |
| lastname | String | - |
| email | String | usernameField for login |
| password | String | hashed with bcrpyt |
| dob | Date | - |
| admin | Boolean | Admin or normal user |

> NOTE: Change these fields in both model and migration files BEFORE running sequelize db:migrate E.G Remove unecessary fields add required fields

### Routes 
| METHOD | Route | Location | Purpose |
| ------ | ------------- | ----------------- |  ------------------------------------------------------------------------- |
| GET | / | index.js | Home Page |
| GET |	/auth/login | controllers/profile.js | Form for login |
| POST | /auth/login | controllers/auth.js | Login and authenticate user |
| GET |	/auth/signup | controllers/auth.js | Form to register as a user |
| POST | /auth/signup | controllers/auth.js | Creates new user and checks for duplicates |
| GET |	/auth/logout | controllers/auth.js | Log out and redirect to home |
| GET |	/profile | controllers/auth.js | Needs to be visited only by a logged in user otherwise redirect to home |
| GET | /tracks | controllers/tracks.js | An index to sort and select tracks that's been uploaded |
| GET | /tracks/:id | controllers/tracks.js | View information about and listen to a specific song |
| GET | /tracks/new | controllers/tracks.js | A form for uploading tracks and information about it |
| POST | /tracks | controllers/tracks.js | upload and create a track post |
| PUT | /tracks/edit/:id | controllers/tracks.js | Edit a previously uploaded track, preferably only if you are the author |
| DELETE | /tracks/:id | controllers/tracks.js | Delete a track post (preferably only if admin/ creator of the post) |
| GET | /tags | controllers/tags.js | View an index of all tags |
| GET | /tags/:id | controllers/tags.js | Get a specific tags page and view their posts |
| PUT | /tags/edit/:id | controllers/tags.js | A form to edit a spcfic tag |
| DELETE | /tags/:id | controllers/tags.js | Delete a specific tag |




