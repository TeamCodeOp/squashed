import React, { Component } from 'react';
import { Header, Grid, Segment, Menu } from 'semantic-ui-react';
import NavHeader from './NavHeader.jsx';
import Search from './Search.jsx';
import MainViewNewProjects from './MainViewNewProjects.jsx';
import SideTechFilter from './SideTechFilter.jsx';
import FeedGithub from './FeedGithub.jsx';
import FeedFriends from './FeedFriends.jsx';

class App extends React.Component {
  // Static methods go on top (says our Linter)
  static setMainViewGithub() {
    return <FeedGithub />;
  }
  constructor(props) {
    super(props);
    this.state = {
      currentMainView: 'Popular'
    };
    this.handleMainViewFilter = this.handleMainViewFilter.bind(this);
  }

  componentDidMount() {
    this.props.filterByViews();
    if (this.props.userId) {
      this.props.checkMessages(this.props.userId);
    }
  }

  setMainViewNewProjects() {
    return (<MainViewNewProjects
      projects={this.props.projects}
      techFilter={this.props.techFilter}
    />);
  }

  handleMainViewFilter(e, { name }) {
    this.setState({
      currentMainView: name
    }, () => {
      if (this.state.currentMainView === 'Popular') {
        this.props.filterByViews();
      } else if (this.state.currentMainView === 'New') {
        this.props.handleGetLatest();
      } else if (this.state.currentMainView === 'Featured on Github') {
        this.props.getGithubRepos();
      } else {
        console.error('There was an error in handleMainViewFilter');
      }
    });
  }

  render() {
    const currentMainView = this.state.currentMainView;
    let mainViewToRender;
    if (this.state.currentMainView === 'Featured on Github') {
      mainViewToRender = <FeedGithub repos={this.props.githubRepos} />;
    } else {
      mainViewToRender = (<MainViewNewProjects
        projects={this.props.projects}
        techFilter={this.props.techFilter}
      />);
    }

    return (
      <div className="ui container">
        {/* <Header id="titleHeader"size="huge" style={{ textAlign: 'center' }}>Squashed</Header> */}
        <div id="mainCopy" className="ui vertical masthead center aligned segment">
            <h4>Connect  Collaborate  Contribute.</h4>
            <span>Showcase and discover new projects.</span>
        </div>

        <Grid>
          <Grid.Column id="mainProjectsMenu">
            <Segment>
              <Menu fluid widths={3} id="mainBG">
                <Menu.Item name="Popular" active={currentMainView === 'Popular'} onClick={this.handleMainViewFilter} />
                <Menu.Item name="New" active={currentMainView === 'New'} onClick={this.handleMainViewFilter} />
                <Menu.Item name="Featured on Github" active={currentMainView === 'Featured on Github'} onClick={this.handleMainViewFilter} />
              </Menu>
            </Segment>
          </Grid.Column>
        </Grid>

        <div id="mainContentArea">
        {/* This is the main content area. We have 3 columns. */}
        <Grid columns={3} stackable>
          {/* Left column for project filtering by tech */}
          <Grid.Column width={2} id="column-1">
            <SideTechFilter
              handleTechs={this.props.handleTechs}
            />
          </Grid.Column>

          {/* Middle column is the main view */}
          <Grid.Column width={11} id="column-2">
            <Segment>
              {mainViewToRender}
            </Segment>
          </Grid.Column>

          {/* Right Column for the feed */}
          <Grid.Column width={3} id="column-3">
            <Segment>
              <FeedFriends />
            </Segment>
          </Grid.Column>
        </Grid>
        </div>
        {/* <Search searchByUserInput={this.props.searchByUserInput} /> */}
      </div>);
  }
}

export default App;
