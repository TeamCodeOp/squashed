const db = require('./index.js');
const Promise = require('bluebird');

const insertProjectData = (projectData) => {
  return new Promise((resolve, reject) => {
    console.log('projectData', projectData);
    const insertQuery =
    `INSERT INTO projects (
      project_name,
      description,
      repo_url,
      category,
      image_Url,
      user_id
    ) VALUES(
      '${projectData.projectName}',
      '${projectData.description}',
      '${projectData.githubRepo}',
      '${projectData.techs[0]}',
      '${projectData.uploadedFileCloudinaryUrl}',
      ${projectData.userId}
    )`;
    console.log('insertQuery', insertQuery);

    db.connection.query(insertQuery, (err, results) => {
      if (err) {
        return reject(err);
      }
      console.log('results', results);
      return resolve(results);
    });
  });
};

/*
{
  projectName: 'foobar',
  description: 'foobar',
  githubRepo: 'foobar',
  techs:
   [ 'backbone',
     'angular',
     'c',
     'express',
     'go',
     'java',
     'javascript',
     'mongo',
     'mysql',
     'node' ],
  uploadedFileCloudinaryUrl: ''
}

*/

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
