const _ = require('underscore');
const dbModel = require('./model');

const compareTechStacks = (techs, techs2) => {
  for (let i = 0; i < techs2.length; i += 1) {
    if (techs.includes(techs2[i])) {
      return true;
    }
  }
  return false;
};

const formatProjectsWithTechs = (data, techs) => {
  const storage = {};
  let projects = [];
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
  projects = _.map(Object.entries(storage), pair => pair[1]);
  return _.filter(projects, project => compareTechStacks(techs, project.techs)
  );
};

const formatGithubRepos = (repos) => {
  formattedRepos = repos.map((repo) => {
    return {
      repo_id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      creation_date: repo.created_at.slice(0, 10),
      owner_id: repo.owner.id,
      owner_image: repo.owner.avatar_url,
      language: repo.language
    };
  });
  const columns = Object.entries(formattedRepos[0]).map(tuple => tuple[0]);
  const values = formattedRepos.map((repo) => {
    return Object.entries(repo).map(tuple => tuple[1]);
  });
  return [columns, values];
};

module.exports.formatProjectsWithTechs = formatProjectsWithTechs;
module.exports.formatGithubRepos = formatGithubRepos;
