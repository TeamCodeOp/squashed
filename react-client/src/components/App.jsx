import React, { Component } from 'react';
import { Header, Grid, Segment, Menu } from 'semantic-ui-react';
import NavHeader from './NavHeader.jsx';
import Search from './Search.jsx';
import NewProjects from './NewProjects.jsx';
import ProjectsMenu from './ProjectsMenu.jsx';
import UserFeed from './UserFeed.jsx';
import FeedPopular from './FeedPopular.jsx';
import FeedFriends from './FeedFriends.jsx';
import FeedGithub from './FeedGithub.jsx';
import SideTechFilter from './SideTechFilter.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedActiveItem: 'Popular'
    };
    this.handleFeedClick = this.handleFeedClick.bind(this);
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

  handleFeedClick(e, { name }) {
    this.setState({
      feedActiveItem: name
    }, () => {
      this.feedToRender = this.setFeedToRender();
    });
  }

  render() {
    const { feedActiveItem } = this.state.feedActiveItem;
    // const { feedToRender } = this.setFeedToRender;
    // let test = this.setFeedToRender();
    // console.log('test: ', test);

    const feedToRender = this.setFeedToRender();
    // console.log('feedToRender is: ', feedToRender);


    return (
      <div className="ui container">
        <Header id="titleHeader"size="huge" style={{ textAlign: 'center' }}>Squashed</Header>
        <SideTechFilter
          handleTechs={this.props.handleTechs}
        />

        {/* This is the main content area */}
        <Grid columns={2} stackable>
          {/* Left area for projects */}
          <Grid.Column width={12}>
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
          <Grid.Column width={4}>
            <div>
              <div id="feedmenu">
                <Menu pointing secondary>
                  <div id="feedmenu1"><Menu.Item name="Popular" active={feedActiveItem === 'popular'} onClick={this.handleFeedClick} /></div>
                  <div id="feedmenu2"><Menu.Item name="Friends" active={feedActiveItem === 'friends'} onClick={this.handleFeedClick} /></div>
                  <div id="feedmenu3"><Menu.Item name="On Github" active={feedActiveItem === 'github'} onClick={this.handleFeedClick} /></div>
                </Menu>
              </div>
              <Segment>
                {feedToRender}
              </Segment>
            </div>
          </Grid.Column>
        </Grid>
        <Search searchByUserInput={this.props.searchByUserInput} />
        <ProjectsMenu
          getProjects={this.props.getProjects}
          handleGetLatest={this.props.handleGetLatest}
          filterByViews={this.props.filterByViews}
        />

        <TechsFilter
          getProjectsByTechs={this.props.getProjectsByTechs}
          handleTechs={this.props.handleTechs}
          techFilter={this.props.techFilter}
        />
        <UserFeed />
        <FeedGithub repos={this.props.githubRepos} />
      </div>);
  }
}
export default App;
