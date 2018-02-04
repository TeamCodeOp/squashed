const db = require('./index.js');
const mysql = require('mysql');
const Promise = require('bluebird');
const format = require('pg-format');

const insertProjectData = (projectData) => {
  return new Promise((resolve, reject) => {
    const insertQuery =
    `INSERT INTO projects (
      project_name,
      description,
      repo_url,
      image_Url,
      user_id
    ) VALUES(
      '${projectData.projectName}',
      '${projectData.description}',
      '${projectData.githubRepo}',
      '${projectData.uploadedFileCloudinaryUrl}',
      ${projectData.userId}
    )`;

    db.connection.query(insertQuery, (err, results) => {
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
        console.log('............results: \n', results2);
      });

      return resolve(results);
    });
  });
};

// const insertProjectData = (params) => {
//   console.log(params, 'params');
//   const insertQuery = 'INSERT INTO projects (project_name) VALUES (?);';
//   return db.queryAsync(insertQuery, params)
//     .then(data => data)
//     .catch((err) => {
//       console.error(err);
//       return err;
//     });
// };
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

module.exports.insertProjectData = insertProjectData;
module.exports.selectAllWhere = selectAllWhere;
