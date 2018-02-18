const utils = require('./utils');
const dbModel = require('../database/model');

// Every 8 hours fetch repos from github

// example crontab
// 0 */8 * * * * /path/to/node path/to/root/directory/workers/githubRepoFetcher.js

console.log('Worker fetching repos...');

const queryString = utils.formatQueryString(10, 2, 2, 1);

utils.fetchGithubRepos(queryString, dbModel.insertGithubRepos);
