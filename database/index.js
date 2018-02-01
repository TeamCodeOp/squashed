const mysql = require('mysql');
const Promise = require('bluebird');

let config;
let connection;

if (process.env.NODE_ENV === 'production') {
  // connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
  connection = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b5947ef2bf9d48',
    password: '43fd774d',
    database: 'heroku_a9ded5de1ff1c8b',
  });
} else {
  connection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'codeop'
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
        if (err) {
          cb(err, null);
        } else {
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
  connection.query(`UPDATE users SET session_id ="" WHERE session_id ='${sessionID}';`, (err, user) => {
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
       console.log(err);
    } else {
      cb(projects);
    }
  });
};

const getUserInfo = (username, cb) => {
  console.log('in database getUserInfo', username);
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
    if (err) {
      throw err;
    } else {
      cb(projects);
    }
  });
};

const getProjectByProjectId = (projectId, cb) => {
  connection.query(`SELECT * FROM projects WHERE id ='${projectId}';`, (err, project) => {
    console.log('line101: ', project);
    if (err) {
      throw err;
    } else {
      cb(project[0]);
    }
  });
};

const getUserByUserId = (userId, cb) => {
  connection.query(`SELECT * FROM users WHERE id ='${userId}';`, (err, user) => {
    console.log('line112: ', user);
    if (err) {
      throw err;
    } else {
      cb(user[0]);
    }
  });
};

const findProject = (query, callback) => {
  const selectQuery = "SELECT * FROM projects WHERE project_name like \'%" + query + "%\';";
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.log('err in database find project', err);
      callback(err, null);
    } else {
      console.log('success in findProject', results);
      callback(null, results);
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
module.exports.getProjectByProjectId = getProjectByProjectId;
module.exports.getUserByUserId = getUserByUserId;
module.exports.findProject = findProject;
