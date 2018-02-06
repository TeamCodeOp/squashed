const utils = require('./utils');
const dbModel = require('../database/model');

// Once a day fetch repos from github
// */1 * * * * /usr/local/bin/node /Users/Dan/desktop/hrr_28/hrr28-web-historian/workers/htmlfetcher.js -update -config=myconfig

console.log('Worker fetching repos...');

const queryString = utils.formatQueryString(10, 2, 2, 1);

utils.fetchGithubRepos(queryString, dbModel.insertGithubRepos);