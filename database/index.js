const mysql = require('mysql');
const Promise = require('bluebird');
let connection;
let config;

if (process.env.NODE_ENV === 'production') {
  connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
} else {
  config = require('../config/configvars.js');
  connection = mysql.createConnection({
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOST
  });
}

connection.connect((err) => {
  if (err) {
    console.log('could not connect to database', err);
  } else {
    console.log('connected to database');
  }
});

const userLogin = (userProfile, cb) => {
  connection.query(`SELECT * FROM users WHERE git_username ='${userProfile.gitLogin}';`, (err, user) => {
    if (user.length === 0 || err) {
      connection.query(`INSERT INTO users (name,git_username,session_id,avatar_url) VALUES ("${userProfile.displayName}",
        "${userProfile.gitLogin}", "${userProfile.session_id}", "${userProfile.avatarUrl}");`, (err, results) => {
        console.log('RESULTS---', results);
        if (err) {
          cb(err, null);
        } else {
          cb(null, results);
        }
      });
    } else if (user.length !== 0) {
      connection.query(`UPDATE users SET session_id ='${userProfile.session_id}' WHERE git_username = '${userProfile.gitLogin}';`, (err, user) => {
        console.log('EXISTING USER', user);
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
  connection.query(`SELECT * FROM users WHERE session_id = '${sessionID}';`, (err, user) => {
    console.log(user[0]);
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
  console.log('deleteUserSession', sessionID);
  connection.query(`UPDATE users SET session_id =" " WHERE session_id ='${sessionID}';`, (err, user) => {
    if (err) {
      throw err;
    } else {
      cb(user);
    }
  });
};

const retrieveProjects = (cb) => {
  connection.query('SELECT * FROM projects', (err, projects) => {
    if (err) {
      throw err;
    } else {
      cb(projects);
    }
  });
};

const getUserInfo = (username, cb) => {
  connection.query(`SELECT * FROM users WHERE git_username ='${username}';`, (err, user) => {
    if (user.length === 0 || err) {
      console.log(err);
    } else {
      cb(user[0]);
    }
  });
};

const getProjectsByUser = (userId, cb) => {
  connection.query(`SELECT * FROM projects WHERE user_id ='${userId}';`, (err, projects) => {
    console.log('line76: ', projects);
    if (err) {
      throw err;
    } else {
      cb(projects);
    }
  });
};


module.exports.connection = connection;
module.exports.userLogin = userLogin;
module.exports.checkUserSession = checkUserSession;
module.exports.deleteUserSession = deleteUserSession;
module.exports.retrieveProjects = retrieveProjects;
module.exports.getUserInfo = getUserInfo;
module.exports.getProjectsByUser = getProjectsByUser;

