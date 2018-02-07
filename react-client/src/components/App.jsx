import React from 'react';
import NavHeader from './NavHeader.jsx';
import Search from './Search.jsx';
import NewProjects from './NewProjects.jsx';
import ProjectsMenu from './ProjectsMenu.jsx';
import TechsFilter from './TechsFilter.jsx';
import RepoList from './RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProjects();
    this.props.getGithubRepos();

    // console.log('App mounted');
    // GET request to '/projects' to get projects
  }
  render() {
    return (
      <div>
        <Search searchByUserInput={this.props.searchByUserInput}/>
        <NewProjects
          projects={this.props.projects}
        />
        <ProjectsMenu getProjects={this.props.getProjects}
          handleGetLatest={this.props.handleGetLatest}
        />
        <TechsFilter
          getProjectsByTechs={this.props.getProjectsByTechs}
          handleTechs={this.props.handleTechs}
          techFilter={this.props.techFilter}
        />
        <RepoList
          repos={this.props.githubRepos}
        />
      </div>);
  }
}
export default App;
