const db = require('./index.js');
const mysql = require('mysql');
const utils = require('./utils');
const Promise = require('bluebird');
const format = require('pg-format');
const _ = require('underscore');

const insertProjectData = (projectData, cb) => {
  return new Promise((resolve, reject) => {
    const sql = formatInsertProjectData(projectData);

    db.connection.query(sql, (err, results) => {
      if (err) {
        cb(err, null);
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
      cb(null, results);
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
  const sql = 'INSERT INTO projects (project_name, description, repo_url, image_Url, user_id, view_count) VALUES(?,?,?,?,?, 0)';
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
  const sql = 'SELECT * from github_repos ORDER BY creation_date DESC LIMIT 10';

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
  let projectId;
  let insert;
  const selectProjectId = `SELECT id FROM projects WHERE PROJECT_NAME='${data.projectName}'`;
  db.connection.query(selectProjectId, (err, results) => {
    projectId = results[0].id;
    insert = `INSERT INTO notifications(event, user_id, project_id, project_name, follower_name, created_date) VALUES(' added a new project ', ${data.userId}, ${projectId},'${data.projectName}', null, CURRENT_TIMESTAMP())`;
    if (err) {
      cb(err, null);
    } else {
      db.connection.query(insert, (err, results) => {
        if (err) {
          cb(err, null);
        } else {
          console.log('notification inserted');
          cb(null, results);
        }
      });
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
    let followerName = '';
    let userName = '';
    if (err) {
      cb(err, null);
    } else {
      followerName = results[0].id === followerInfo.user_id ? results[0].git_username : results[1].git_username;
      userName = results[1].id === followerInfo.follower_id ? results[1].git_username : results[0].git_username;
    }
    const insertQuery = `INSERT INTO notifications(event, user_id, project_id, project_name,follower_name, created_date) VALUES(' is following ', ${followerInfo.follower_id}, null, null, '${followerName}',CURRENT_TIMESTAMP())`;
    db.connection.query(insertQuery, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        cb(null, results);
      }
    });
  });
};

const usersJoinNotifications = (userData, cb) => {
  const queryStr = 'select users.git_username,users.avatar_url,notifications.event, notifications.created_date,notifications.project_id,notifications.project_name,notifications.follower_name from users right join notifications on users.id = notifications.user_id order by created_date desc';
  db.connection.query(queryStr, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const deleteFollowerNotification = (followerInfo, cb) => {
  const deleteQuery = `DELETE FROM notifications WHERE user_id = ${followerInfo.id} and follower_name = '${followerInfo.name}';`;
  db.connection.query(deleteQuery, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const userLogin = (userProfile, cb) => {
  const userBio = userProfile.user_bio || '';
  db.connection.query(`SELECT * FROM users WHERE git_username ='${userProfile.gitLogin}';`, (err, user) => {
    if (user.length === 0 || err) {
      db.connection.query(`INSERT INTO users (name,git_username,session_id,avatar_url,user_bio) VALUES ("${userProfile.displayName}",
        "${userProfile.gitLogin}", "${userProfile.session_id}", "${userProfile.avatarUrl}", "${userBio}");`, (err, results) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, results);
        }
      });
    } else if (user.length !== 0) {
      db.connection.query(`UPDATE users SET session_id ='${userProfile.session_id}' WHERE git_username = '${userProfile.gitLogin}';`, (err, user) => {
        if (err) {
          throw err;
        } else {
          cb(null, user);
        }
      });
    }
  });
};

const checkUserSession = (sessionID, cb) => {
  db.connection.query(`SELECT * FROM users WHERE session_id = '${sessionID}';`, (err, user) => {
    if (err) {
      throw err;
    } else if (user[0]) {
      cb(user[0]);
    } else {
      cb('User not logged in');
    }
  });
};

const deleteUserSession = (sessionID, cb) => {
  db.connection.query(`UPDATE users SET session_id ="" WHERE session_id ='${sessionID}';`, (err, user) => {
    if (err) {
      throw err;
    } else {
      cb(user);
    }
  });
};

const retrieveProjects = (cb) => {
  db.connection.query('SELECT * FROM projects ORDER BY creation_date DESC', (err, projects) => {
    if (err) {
      console.log(err);
    } else {
      cb(projects);
    }
  });
};

const retrieveProjectsByTechs = (techs, cb) => {
  const sql = 'SELECT * FROM projects LEFT JOIN technologies ON projects.id = technologies.project_id';

  db.connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      cb(utils.formatProjectsWithTechs(results, techs));
    }
  });
};

const getUserInfo = (username, cb) => {
  db.connection.query(`SELECT * FROM users WHERE git_username ='${username}';`, (err, user) => {
    if (user.length === 0 || err) {
      console.log(err);
    } else {
      cb(user[0]);
    }
  });
};

const getProjectsByUser = (userId, cb) => {
  db.connection.query(`SELECT * FROM projects WHERE user_id ='${userId}';`, (err, projects) => {
    if (err) {
      throw err;
    } else {
      cb(projects);
    }
  });
};

const findProject = (query, cb) => {
  const selectQuery = "SELECT * FROM projects WHERE project_name like \'%" + query + "%\';";
  db.connection.query(selectQuery, (err, results) => {
    if (err) {
      console.log('err in database find project', err);
      cb(err, null);
    } else {
      console.log('success in findProject', results);
      cb(null, results);
    }
  });
};

const deleteProjectByProjectId = (query, callback) => {
  const deleteTechQuery = `DELETE FROM technologies WHERE project_id = '${query}';`;
  db.connection.query(deleteTechQuery, (err1, data) => {
    if (err1) {
      console.log('error in database technologies delete');
      callback(err1, null);
    } else {
      const deleteQuery = `DELETE FROM projects WHERE id ='${query}';`;
      db.connection.query(deleteQuery, (err, results) => {
        if (err) {
          console.log('err in database delete project', err);
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    }
  });
};

const getCurrentUserProfileId = (query, cb) => {
  const insertQuery = `SELECT id FROM users WHERE git_username = '${query.username}'`;
  db.connection.query(insertQuery, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results[0]['id']);
    }
  });
};

const checkIfCurrentlyFollowing = (followRequestData, cb) => {
  const insertQuery = `SELECT user_id FROM followers WHERE user_id ='${followRequestData.currentUserProfileId}' AND follower_id='${followRequestData.loggedInUserId}'`;

  db.connection.query(insertQuery, (err, data) => {
    cb(err, data);
  });
};

const removeFollowerConnection = (unfollowRequestData, cb) => {
  const insertQuery = `DELETE FROM followers WHERE user_id ='${unfollowRequestData.user_id}' AND follower_id='${unfollowRequestData.follower_id}'`;

  db.connection.query(insertQuery, (err, data) => {
    cb(err, data);
  });
};

const createFollowerConnection = (followRequestData, cb) => {
  return new Promise((resolve, reject) => {
    const insertQuery =
    `INSERT INTO followers (
      user_id,
      follower_id
    ) VALUES(
      ${followRequestData.user_id},
      ${followRequestData.follower_id}
    )`;

    db.connection.query(insertQuery, (err, results) => {
      if (err) {
        console.log('error: \n', err);
      }
      console.log('Created a follower connection (from modex/index.js): \n', results);
      cb(null, results);
      return resolve(results);
    });
  });
};

const updateProjectByProjectId = (projectData, cb) => {
  db.connection.query(`UPDATE projects SET project_name ='${projectData.projectName}', description='${projectData.description}',repo_url='${projectData.githubRepo}' WHERE id = '${projectData.projectId}';`, (err, user) => {
    if (err) {
      throw err;
    } else {
      cb(null, user);
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
module.exports.deleteFollowerNotification = deleteFollowerNotification;
module.exports.userLogin = userLogin;
module.exports.checkUserSession = checkUserSession;
module.exports.deleteUserSession = deleteUserSession;
module.exports.retrieveProjects = retrieveProjects;
module.exports.retrieveProjectsByTechs = retrieveProjectsByTechs;
module.exports.getUserInfo = getUserInfo;
module.exports.getProjectsByUser = getProjectsByUser;
module.exports.findProject = findProject;
module.exports.deleteProjectByProjectId = deleteProjectByProjectId;
module.exports.getCurrentUserProfileId = getCurrentUserProfileId;
module.exports.checkIfCurrentlyFollowing = checkIfCurrentlyFollowing;
module.exports.removeFollowerConnection = removeFollowerConnection;
module.exports.createFollowerConnection = createFollowerConnection;
module.exports.updateProjectByProjectId = updateProjectByProjectId;
