const db = require('./index.js');
const Promise = require('bluebird');

const postProjects = (req, res, data) => {
  console.log('here')
  return new Promise((resolve, reject) => {
    const insertQuery = `INSERT INTO projects (project_name) VALUES('${data.project_name}')`;
    db.query(insertQuery, (err, results) => {
      if (err) {
        return reject(err);
      }
      console.log('results', results);
      return resolve(results);
    });
  });
};
