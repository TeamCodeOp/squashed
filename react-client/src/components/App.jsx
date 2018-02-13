import React, { Component } from 'react';
import { Header, Grid, Segment, Menu } from 'semantic-ui-react';
import NavHeader from './NavHeader.jsx';
import Search from './Search.jsx';
import NewProjects from './NewProjects.jsx';
import ProjectsMenu from './ProjectsMenu.jsx';
import FeedPopular from './FeedPopular.jsx';
import FeedFriends from './FeedFriends.jsx';
import FeedGithub from './FeedGithub.jsx';
import SideTechFilter from './SideTechFilter.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedActiveItem: 'Popular',
      currentMainView: 'Popular'
    };
  }

  componentDidMount() {
    this.props.getProjects();
    this.props.getGithubRepos();
    if (this.props.userId) {
      this.props.checkMessages(this.props.userId);
    }
  }

  setFeedToRender() {
    let feed;
    if (this.state.feedActiveItem === 'Popular') {
      feed = <FeedPopular />;
    } else if (this.state.feedActiveItem === 'Friends') {
      feed = <FeedFriends />;
    }
    return feed;
  }

  // TODO for Ralph: Delete after you're done w/ home page refactor
  // handleFeedClick(e, { name }) {
  //   this.setState({
  //     feedActiveItem: name
  //   }, () => {
  //     this.feedToRender = this.setFeedToRender();
  //   });
  // }

  handleMainProjectsFilter(e, { currentMainView }) {
    console.log('clicked: ', currentMainView);

    // this.setState({
    //   feedActiveItem: name
    // }, () => {
    //   this.feedToRender = this.setFeedToRender();
    // });
  }

  render() {
    const { currentMainView } = this.state.currentMainView;

    return (
      <div className="ui container">
        <Header id="titleHeader"size="huge" style={{ textAlign: 'center' }}>Squashed</Header>

        <Grid>
          <Grid.Column id="mainProjectsMenu">
            <Segment>
              <Menu fluid widths={3} id="mainBG">
                <Menu.Item name="Popular" active={currentMainView === 'Popular'} onClick={this.handleMainProjectsFilter} />
                <Menu.Item name="New" active={currentMainView === 'New'} onClick={this.handleMainProjectsFilter} />
                <Menu.Item name="Featured on Github" active={currentMainView === 'Featured on Github'} onClick={this.handleMainProjectsFilter} />
              </Menu>
            </Segment>
          </Grid.Column>
        </Grid>

        {/* This is the main content area. We have 3 columns. */}
        <Grid columns={3} stackable>

          {/* Left column for frpoject filtering by tech */}
          <Grid.Column width={2} id="column-1">
            <SideTechFilter
              handleTechs={this.props.handleTechs}
            />
          </Grid.Column>

          {/* Middle column to show projects */}
          <Grid.Column width={11} id="column-2">
            <Segment>
              <NewProjects
                projects={this.props.projects}
                isViewFilter={this.props.isViewFilter}
                toggleViewFilter={this.props.toggleViewFilter}
                techFilter={this.props.techFilter}
              />
            </Segment>
          </Grid.Column>

          {/* Right Column for the feed */}
          <Grid.Column width={3} id="column-3">
            <Segment>
              <FeedFriends />
            </Segment>
          </Grid.Column>
        </Grid>
        <Search searchByUserInput={this.props.searchByUserInput} />
        <ProjectsMenu
          getProjects={this.props.getProjects}
          handleGetLatest={this.props.handleGetLatest}
          filterByViews={this.props.filterByViews}
        />
        <FeedGithub repos={this.props.githubRepos} />
      </div>);
  }
}
export default App;
