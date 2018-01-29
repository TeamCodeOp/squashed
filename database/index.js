const mysql = require('mysql');
const Promise = require('bluebird');




let connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'codeop'
});


connection.connect((err) => {
  if (err) {
    console.log('could not connect to database', err);
  } else {
    console.log('connected to database');
  }
});

let userLogin = (userProfile, cb) => {
  console.log('userLogin in database', userProfile);
  connection.query(`SELECT * FROM users WHERE git_username ='${userProfile.gitLogin}';`, (err, user) => {
    console.log('USER......', user);
    if (user.length === 0 || err) {
      connection.query(`INSERT INTO users (name,git_username) VALUES ("${userProfile.displayName}", "${userProfile.gitLogin}");`, (err, results) => {
        console.log('inner results in sql');
        if (err) {
          cb(err, null);
        } else {
          console.log('user inserted in the table');
          cb(null, results);
        }
      });
    } else if (user.length !== 0) {
      console.log('user already existed in the table');
      cb(null, user);
    }
  });
};


module.exports.connection = connection;
module.exports.userLogin = userLogin;

