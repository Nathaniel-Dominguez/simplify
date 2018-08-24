# Auth Boilerplate: How to Use

This is my Authentication Boilerplate built to serve logging in, profiles and logout.
This way I don't have to build it from scratch everytime I need to use a login, logout express routing.

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
| ------ | ------------- | ----------------- |  --------------------------------------------------------------- |
| GET | / | index.js | Home Page |
| GET |	/auth/login | controllers/profile.js | Form for login |
| POST | /auth/login | controllers/auth.js | Login and authenticate user |
| GET |	/auth/signup | controllers/auth.js | Form to register as a user |
| POST | /auth/signup | controllers/auth.js | Creates new user and checks for duplicates |
| GET |	/auth/logout | controllers/auth.js | Log out and redirect to home |
| GET |	/profile | controllers/auth.js | Needs to be visited only by a logged in user otherwise redirect to home |

## Steps to Use

#### 1. Clone repo, but with a different name! 

``` 
git clone <repo_link> <new_name>
```

#### 2. Install node modules from `package.json`

```
npm install
```

#### 3. Customize with project name

* Title in the layout.ejs
* Logo in the navbar
* Description/Repo link in package.json
* Update Readme

#### 4. Create a new database for your new project 

```
createdb <new_db_name>
```
#### 5. Open `config.json` and change the following

* Change database name to what you created in step 2
* Set username/password for your local environment
* Make sure the vlafor of SQL matches what you're using 

> NOTE: If changing from Postgres, remember to change your node_modules E.G npm install mysql 

#### 6. Check models and migrations for your needs

For example if you don't need the `admin` column, you will want to delete it from both the migration and the model for the user. Likewise if you need to add something, add in both files.

Just make sure they're both the same.

#### 7. Run the database migrations

```
sequelize db:migrate
```  

#### 8. Add a `.env` with a SESSION_SECRET key

This can be set to whatever you would like 

> NOTE: It should already be in the .gitignore file

#### 9. Run your server and make sure everything works

If you have nodemon installed globally:
```
nodemon
```

Otherwise:
```
node index.js
```

#### 10. Create a new repo for the new project to live in

* Create a new repo on your personal Github
* Delete the old remote to origin
* Add new repo as a new remote location (can also be called origin since we deleted the original origin)
* PUSH IT BABY!

```
git remote remove origin
git remote add origin <new_repo_link>
git add .
git commit -m 'Beginning of new project'
git push origin master
```

> NOTE: Do NOT make commits from the new project to your auth boiler plate repo! Keep it clean!


## Next Steps

Assuming that this all worked, now you can add new models/migrations for your new app, and generally just start building it.






