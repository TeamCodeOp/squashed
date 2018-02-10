const db = require('./index.js');
const mysql = require('mysql');
const utils = require('./utils');
const Promise = require('bluebird');
const format = require('pg-format');
const _ = require('underscore');

const insertProjectData = (projectData) => {
  return new Promise((resolve, reject) => {
    const sql = formatInsertProjectData(projectData);

    db.connection.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      const techs = projectData.techs;
      const valuesToInsert = [];
      techs.forEach((techName) => {
        valuesToInsert.push([results.insertId, techName]);
      });

      const sql = format('INSERT INTO technologies (project_id, tech_name) VALUES %L', valuesToInsert);

      db.connection.query(sql, (err2, results2) => {
        if (err2) {
          console.log('error: \n', err2);
        }
      });

      return resolve(results);
    });
  });
};

const formatSelectAllWhere = (table, column, value) => {
  const sql = 'SELECT * FROM ?? WHERE ?? = ?';
  const inserts = [table, column, value];
  return mysql.format(sql, inserts);
};

const selectAllWhere = (table, column, value, isOne, cb) => {
  const sql = formatSelectAllWhere(table, column, value);

  db.connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else if (isOne === true) {
      cb(results[0]);
    } else {
      cb(results);
    }
  });
};

const formatInsertProjectData = (data) => {
  const sql = 'INSERT INTO projects (project_name, description, repo_url, image_Url, creation_date, user_id, view_count) VALUES(?,?,?,?,CURDATE(),?, 0)';
  const inserts = [data.projectName, data.description, data.githubRepo,
    data.uploadedFileCloudinaryUrl, data.userId];
  return mysql.format(sql, inserts);
};

const insertGithubRepos = (repos) => {
  let filteredRepos;
  let cols;
  let values;
  let resultsIds;

  db.connection.query('SELECT repo_id from github_repos', (err, results) => {
    if (err) {
      throw err;
    }
    resultsIds = _.map(results, el => el.repo_id);
    filteredRepos = _.filter(repos, repo => !_.contains(resultsIds, repo.id));

    if (filteredRepos.length === 0) {
      console.log('No new repos to add');
      return;
    }

    cols = utils.formatGithubRepos(filteredRepos)[0];
    values = utils.formatGithubRepos(filteredRepos)[1];

    db.connection.query(`INSERT INTO github_repos (${cols}) VALUES ?`, [values], (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log('github repos added');
      }
    });
  });
};

const retrieveGithubRepos = (cb) => {
  const sql = 'SELECT * from github_repos LIMIT 5';

  db.connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      cb(results);
    }
  });
};

const incrementViewCount = (projectId, cb) => {
  const sql = `UPDATE projects SET view_count = view_count + 1 WHERE id = ${projectId}`;
  const inserts = [projectId];
  const query = mysql.format(sql, inserts);

  db.connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      db.connection.query(`SELECT view_count FROM projects WHERE id=${projectId}`, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          cb(results[0]);
        }
      });
    }
  });
};

const getProjectsByViews = (cb) => {
  const sql = 'SELECT * FROM projects ORDER BY view_count DESC';
  db.connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('viewResults----', results)
      cb(results);
    }
  });
};

const formatInsertMessage = (messageInfo, cb) => {
  let recipientId;
  const userQuery = 'SELECT id FROM users WHERE git_username = ?';
  const userSql = mysql.format(userQuery, messageInfo.recipientUsername);

  db.connection.query(userSql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      recipientId = results[0].id;
      console.log(results[0].id);

      const sql = 'INSERT INTO private_messages (sender_id, recipient_id, time_sent, content, opened) VALUES(?, ?, CURRENT_TIMESTAMP(), ?, false)';

      const inserts = [messageInfo.senderId, recipientId, messageInfo.content];
      const sqlQuery = mysql.format(sql, inserts);

      db.connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      console.log('in else results');
      cb(null, results);
    }
  });
    }
  });

};


const insertMessage = (messageInfo, cb) => {
  const sql = formatInsertMessage(messageInfo);
  console.log('insertfunc msgInfo', messageInfo);
  console.log('sql query:', sql)
  db.connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      console.log('in else results');
      cb(null, results);
    }
  });
};

module.exports.insertProjectData = insertProjectData;
module.exports.selectAllWhere = selectAllWhere;
module.exports.insertGithubRepos = insertGithubRepos;
module.exports.retrieveGithubRepos = retrieveGithubRepos;
module.exports.incrementViewCount = incrementViewCount;
module.exports.getProjectsByViews = getProjectsByViews;
module.exports.insertMessage = insertMessage;
module.exports.formatInsertMessage = formatInsertMessage;
