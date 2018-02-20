# Squashed

Find other engineers to collaborate with!! :octocat: :squirrel:

Deployed link: https://squashed.herokuapp.com/

## Team

* [Thuan Tran](https://github.com/toowan) :star2: 
* [Tejaswi Guvvala](https://github.com/tguvvala) :star2: 
* [Ralph Plumley](https://github.com/ralphplumley) :star2: 
* [Dan Kelly](https://github.com/DanielJKelly) :star2: 

## Table of Contents

1. [Dependencies](#dependencies)
1. [Setup](#setup)
1. [Contributing](#contributing)


## Dependencies
You will need MySQL, node, and npm installed on your computer to run locally:

1. Install node v8.9.3
2. npm v5.6.0
3. MySQL v5.7.20

## Setup

### Local

1. Clone the repo and in the root directory of your app run ```npm install```
2. Sign up for a Cloudinary account and take note of the upload url and upload preset which will be in your Dashboard.
3. Create a Github oAuth app (https://github.com/settings/applications/new)
4. Give your localhost url in the Homepage url(eg: http://localhost:3000/) and Authorization callback url (eg: http://localhost:3000/auth/github/return)
4. In the root of your app change the name of configvars.example.js to configvars.js. You can update your keys here.
5. Build the schema by going to the database folder in your terminal and then run ```mysql -u root < schema.sql``` 
6. If your MySql root user has a password, you will need to modify the password in database/index.js in order to connect to   the database.
7. In order to automatically populate the github_repos table in the database, you will need to create a crontab that periodically runs   workers/githubRepoFetcher.js 
    * An example crontab that runs every 8 hours : ```0 */8 * * * * PATH/TO/NODE PATH/TO/ROOT/DIRECTORY/thesis/workers/githubRepoFetcher.js```
8. Start the React server by running ```npm run react-server```
9. Start the node server by running ```npm run server-dev```
10. Run the test suite with ```npm test```

### Heroku 
1. Create Heroku app either via the Heroku website or Heroku CLI 
2. Install the ClearDB addon
3. Retrieve the necessary credentials from ClearDB and add them to the config vars on Heroku 
    * CLEARDB_DATABASE_URL
    * CLEARDB_HOST
    * CLEARDB_NAME
    * CLEARDB_PASS
    * CLEARDB_USERNAME
    * The host, name, and username can be extrapolated from URL. The password can be found (and reset) by navigating to the ClearDB   dashboard, clicking on the heroku database link, and selecting the System Information tab. 
4. Add the Github App ID and Secret as config vars - CLIENT_ID and CLIENT_SECRET  
5. Build the heroku database schema  
    * ```cd database``` and ```-- mysql --host=DB_HOST --user=DB_USER--password=DB_PASS --reconnect DB_NAME < schema.sql```
6. Add the Cloudinary Upload Url and preset to the config vars - CLOUDINARY_URL and CLOUDINARY_UPLOAD_PRESET 
7. Install the Heroku Scheduler addon
    * Create a new job that runs ```npm run fetch-repos``` either every ten minutes, hourly, or daily.

## Contributing 
Please see [Contributing.md](https://github.com/TeamCodeOp/Squashed/blob/master/CONTRIBUTING.md) for guidelines on making pull requests.
