# Simplify
Simple Spotify with social media :p

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

### Defualt Routes Supplied
| METHOD | Route | Location | Purpose |
| ------ | ------------- | ----------------- |  ------------------------------------------------------------------------- |
| GET | / | index.js | Home Page |
| GET |	/auth/login | controllers/profile.js | Form for login |
| POST | /auth/login | controllers/auth.js | Login and authenticate user |
| GET |	/auth/signup | controllers/auth.js | Form to register as a user |
| POST | /auth/signup | controllers/auth.js | Creates new user and checks for duplicates |
| GET |	/auth/logout | controllers/auth.js | Log out and redirect to home |
| GET |	/profile | controllers/auth.js | Needs to be visited only by a logged in user otherwise redirect to home |
| GET | /music | An index to sort and select music that's been uploaded |
| GET | /music/:id | View information about and listen to a specific song |
| GET | /music/new | A form for uploading music and information about it |
| POST | /music | upload and create a post |





