const _ = require('underscore');

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

module.exports.formatProjectsWithTechs = formatProjectsWithTechs;
