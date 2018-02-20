Squashed
Find other engineers to collaborate with!! :octocat: :shipit:

Deployed link: https://squashed.herokuapp.com/

Team
Thuan Tran 🌟
Tejaswi Guvvala 🌟
Ralph Plumley 🌟
Dan Kelly 🌟
Table of Contents
Dependencies
Setup
Contributing
Dependencies
You will need MySQL, node, and npm installed on your computer to run locally:

Install node v8.9.3
npm v5.6.0
MySQL v5.7.20
Setup
Local
Clone the repo and in the root directory of your app run npm install
Sign up for a Cloudinary account and take note of the upload url and upload preset which will be in your Dashboard.
Create a Github oAuth app (https://github.com/settings/applications/new)
Give your localhost url in the Homepage url(eg: http://localhost:3000/) and Authorization callback url (eg: http://localhost:3000/auth/github/return)
In the root of your app change the name of configvars.example.js to configvars.js. You can update your keys here.
Build the schema by going to the database folder in your terminal and then run mysql -u root < schema.sql
If your MySql root user has a password, you will need to modify the password in database/index.js in order to connect to the database.
In order to automatically populate the github_repos table in the database, you will need to create a crontab that periodically runs workers/githubRepoFetcher.js
An example crontab that runs every 8 hours : 0 */8 * * * * PATH/TO/NODE PATH/TO/ROOT/DIRECTORY/thesis/workers/githubRepoFetcher.js
Start the React server by running npm run react-server
Start the node server by running npm run server-dev
Run the test suite with npm test
Heroku
Create Heroku app either via the Heroku website or Heroku CLI
Install the ClearDB addon
Retrieve the necessary credentials from ClearDB and add them to the config vars on Heroku
CLEARDB_DATABASE_URL
CLEARDB_HOST
CLEARDB_NAME
CLEARDB_PASS
CLEARDB_USERNAME
The host, name, and username can be extrapolated from URL. The password can be found (and reset) by navigating to the ClearDB dashboard, clicking on the heroku database link, and selecting the System Information tab.
Add the Github App ID and Secret as config vars - CLIENT_ID and CLIENT_SECRET
Build the heroku database schema
cd database and -- mysql --host=DB_HOST --user=DB_USER--password=DB_PASS --reconnect DB_NAME < schema.sql
Add the Cloudinary Upload Url and preset to the config vars - CLOUDINARY_URL and CLOUDINARY_UPLOAD_PRESET
Install the Heroku Scheduler addon
Create a new job that runs npm run fetch-repos either every ten minutes, hourly, or daily.
Contributing
Please see Contributing.md for guidelines on making pull requests.
