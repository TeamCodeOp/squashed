const db = require('./index.js');
const Promise = require('bluebird');

const insertProjectData = (data) => {
  console.log('here', data.project_name);
  return new Promise((resolve, reject) => {
    const insertQuery = `INSERT INTO projects (project_name) VALUES('${data.project_name}')`;
    console.log('insertQuery', insertQuery);
    db.query(insertQuery, (err, results) => {
      if (err) {
        return reject(err);
      }
      //console.log('results', results);
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

module.exports.insertProjectData = insertProjectData;
