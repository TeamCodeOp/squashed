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
      cb(results);
    }
  });
};


const insertNotification = (data, cb) => {
  //console.log('database: insertNotification');
  const insert = `INSERT INTO notifications(event, user_id, created_date) VALUES(' added a new project ${data.projectName}', ${data.userId}, CURRENT_TIMESTAMP())`;
  console.log('insert', insert);
  db.connection.query(insert, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      console.log('notification inserted');
      cb(null, results);
    }
  });
};

const formatInsertMessage = (messageInfo, cb) => {
  let recipientId;
  let sender;
  const userQuery = 'SELECT id FROM users WHERE git_username = ?';
  const userSql = mysql.format(userQuery, messageInfo.recipientUsername);
  const senderSql = `SELECT avatar_url FROM users WHERE id = ${messageInfo.senderId}`;
  db.connection.query(senderSql, (err, senderInfo) => {
    if (err) {
      console.log(err);
    } else {
      sender = senderInfo[0];


      db.connection.query(userSql, (err, userInfo) => {
        if (err) {
          console.log(err);
        } else {
          recipientId = userInfo[0].id;
          const sql = 'INSERT INTO private_messages (sender_id, sender_name, sender_username, sender_img, recipient_id, time_sent, content, subject, opened) VALUES(?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, ?, false)';

          const inserts = [messageInfo.senderId, messageInfo.senderName, messageInfo.senderUsername, sender.avatar_url, recipientId, messageInfo.content, messageInfo.subject];
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
    }
  });
};


const deleteMessage = (messageId, recipientId, cb) => {
  const sql = 'DELETE FROM private_messages WHERE id = ?';
  const formattedSql = mysql.format(sql, messageId);
  db.connection.query(formattedSql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      selectAllWhere('private_messages', 'recipient_id', recipientId, false, messages => cb(messages));
    }
  });
};

const markAllOpened = (messages, recipientId, cb) => {
  const cols = utils.formatMessages(messages)[0];
  const values = utils.formatMessages(messages)[1];

  db.connection.query(`INSERT INTO private_messages (${cols}) VALUES ? ON DUPLICATE KEY UPDATE ${cols[1]} = true`, [values], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      selectAllWhere('private_messages', 'recipient_id', recipientId, false, msgs => cb(msgs));
    }
  });
};

const insertFollowerNotification = (followerInfo, cb) => {
  const selectQuery = `SELECT id,git_username FROM users WHERE id in (${followerInfo.user_id}, ${followerInfo.follower_id});`;
  db.connection.query(selectQuery, (err, results) => {
    let followerName ='';
    let userName = '';
    if (err) {
      cb(err, null);
    } else {
      followerName = results[0].id === followerInfo.user_id ? results[0].git_username : results[1].git_username;
      userName = results[1].id === followerInfo.follower_id ? results[1].git_username : results[0].git_username;
    }
     const insertQuery = `INSERT INTO notifications(event, user_id, created_date) VALUES('is following ${followerName}', ${followerInfo.follower_id}, CURRENT_TIMESTAMP())`;
    db.connection.query(insertQuery, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log('notification inserted', results);
        cb(results);
      }
    });
  });
};

const usersJoinNotifications = (userData, cb) => {
  let queryStr = `select users.git_username,users.avatar_url,notifications.event, notifications.created_date from users right join notifications on users.id = notifications.user_id`;
  db.connection.query(queryStr, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      console.log('all notifications', results);
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
module.exports.insertNotification = insertNotification;
module.exports.formatInsertMessage = formatInsertMessage;
module.exports.insertFollowerNotification = insertFollowerNotification;
module.exports.usersJoinNotifications = usersJoinNotifications;
module.exports.deleteMessage = deleteMessage;
module.exports.markAllOpened = markAllOpened;

