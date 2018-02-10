import React, { Component } from 'react';
import { Header, Grid, Segment, Menu } from 'semantic-ui-react';
import NavHeader from './NavHeader.jsx';
import Search from './Search.jsx';
import NewProjects from './NewProjects.jsx';
import ProjectsMenu from './ProjectsMenu.jsx';
import TechsFilter from './TechsFilter.jsx';
import RepoList from './RepoList.jsx';
import UserFeed from './UserFeed.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProjects();
    this.props.getGithubRepos();
    if (this.props.userId) {
      this.props.checkMessages(this.props.userId);
    }

    // console.log('App mounted');
    // GET request to '/projects' to get projects
  }

  render() {
    return (
      <div>
        <Header id="titleHeader"size="huge" style={{ textAlign: 'center' }}>Squashed</Header>

        {/* This is the main content area */}
        <Grid columns={2} stackable>
          {/* Left area for projects */}
          <Grid.Column width={10}>
            <Segment>
              <NewProjects
                projects={this.props.projects}
                isViewFilter={this.props.isViewFilter}
                toggleViewFilter={this.props.toggleViewFilter}
                techFilter={this.props.techFilter}
              />
            </Segment>
          </Grid.Column>
          {/* Right area for our feeds (Following activities, popular, latest) */}
          <Grid.Column width={6}>
            <Segment>Content</Segment>
          </Grid.Column>
        </Grid>



        <Search searchByUserInput={this.props.searchByUserInput}/>
        <ProjectsMenu getProjects={this.props.getProjects}
          handleGetLatest={this.props.handleGetLatest}
          filterByViews={this.props.filterByViews}
        />
        <TechsFilter
          getProjectsByTechs={this.props.getProjectsByTechs}
          handleTechs={this.props.handleTechs}
          techFilter={this.props.techFilter}
        />

        <RepoList
          repos={this.props.githubRepos}
        />
        <UserFeed />
      </div>);
  }
}
export default App;
