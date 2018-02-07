const utils = require('./utils');
const dbModel = require('../database/model');

// Every 8 hours fetch repos from github
// 0 */8 * * * * /usr/local/bin/node /Users/Dan/Desktop/HRR_Thesis/CodeOp/thesis/workers/githubRepoFetcher.js

console.log('Worker fetching repos...');

const queryString = utils.formatQueryString(10, 2, 2, 1);

utils.fetchGithubRepos(queryString, dbModel.insertGithubRepos);