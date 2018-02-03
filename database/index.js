const mysql = require('mysql');
const Promise = require('bluebird');
const _ = require('underscore');

let config;
let connection;

if (process.env.NODE_ENV === 'production') {
  connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.CLEARDB_HOST,
    user: process.env.CLEARDB_USERNAME,
    password: process.env.CLEARDB_PASS,
    database: process.env.CLEARDB_NAME
  });
} else {
  connection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'codeop'
  });
}

// Uncomment below code for local testing
// connection.connect((err) => {
//   if (err) {
//     console.log('could not connect to database', err);
//   } else {
//     console.log('connected to database');
//   }
// });

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

const retrieveProjectsByTechs = (techs, cb) => {
  const sql = 'SELECT * FROM projects LEFT JOIN technologies ON projects.id = technologies.project_id';

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('RESULTSSSS', results)
      cb(formatProjectsWithTechs(results, techs));
    }
  });
};

const formatProjectsWithTechs = (data, techs) => {
  console.log('techs in format', techs);
  const storage = {};
  const projects = [];
  for (let i = 0; i < data.length; i += 1) {
    const projectId = data[i].project_id;
    if (!storage[projectId]) {
      storage[projectId] = data[i];
      storage[projectId].techs = [];
      storage[projectId].techs.push(storage[projectId].tech_name);
      delete storage[projectId].tech_name;
      delete storage[projectId].id;
    } else {
      storage[projectId].techs.push(data[i].tech_name);
    }
  }
  return _.filter(Object.entries(storage), (pair) => {
    return JSON.stringify(pair[1].techs.sort()) === JSON.stringify(techs.sort());
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
    if (err) {
      throw err;
    } else {
      cb(projects);
    }
  });
};

const getProjectByProjectId = (projectId, cb) => {
  connection.query(`SELECT * FROM projects WHERE id ='${projectId}';`, (err, project) => {
    if (err) {
      throw err;
    } else {
      cb(project[0]);
    }
  });
};

const getUserByUserId = (userId, cb) => {
  connection.query(`SELECT * FROM users WHERE id ='${userId}';`, (err, user) => {
    if (err) {
      throw err;
    } else {
      cb(user[0]);
    }
  });
};

const getTechByProjectId = (projectId, cb) => {
  connection.query(`SELECT * FROM technologies WHERE project_id ='${projectId}';`, (err, data) => {
    if (err) {
      throw err;
    } else {
      cb(data);
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
module.exports.getTechByProjectId = getTechByProjectId;
module.exports.findProject = findProject;
module.exports.retrieveProjectsByTechs = retrieveProjectsByTechs;
