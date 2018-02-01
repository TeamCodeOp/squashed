const db = require('./index.js');
const Promise = require('bluebird');

const insertProjectData = (projectData) => {
  return new Promise((resolve, reject) => {
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
    db.connection.query(insertQuery, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

module.exports.insertProjectData = insertProjectData;
