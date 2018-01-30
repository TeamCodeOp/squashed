const mysql = require('mysql');
const Promise = require('bluebird');

let connection = mysql.createConnection({
  user: 'root',
  password: 'root',
  database: 'codeop'
});


connection.connect((err) => {
  if (err) {
    console.log('could not connect to database', err);
  } else {
    console.log('connected to database');
  }
});

const userLogin = (userProfile, cb) => {
  // console.log('userLogin in database', userProfile);
  connection.query(`SELECT * FROM users WHERE git_username ='${userProfile.gitLogin}';`, (err, user) => {
    // console.log('USER......', user);
    if (user.length === 0 || err) {
      // console.log('line 27 ----------', userProfile);
      connection.query(`INSERT INTO users (name,git_username,session_id) VALUES ("${userProfile.displayName}",
        "${userProfile.gitLogin}", "${userProfile.session_id}");`, (err, results) => {
        if (err) {
          cb(err, null);
        } else {
          // console.log('user inserted in the table');
          cb(null, results);
        }
      });
    } else if (user.length !== 0) {
      connection.query(`UPDATE users SET session_id ='${userProfile.session_id}' WHERE git_username = '${userProfile.gitLogin}';`, (err, user) => {
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


module.exports.connection = connection;
module.exports.userLogin = userLogin;
module.exports.checkUserSession = checkUserSession;
module.exports.deleteUserSession = deleteUserSession;
