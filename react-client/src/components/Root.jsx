import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import RouteProps from 'react-route-props';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavHeader from './NavHeader.jsx';
import App from './App.jsx';
import Developer from './Developer.jsx';
import Project from './Project.jsx';
import UploadForm from './UploadForm.jsx';
import PleaseLogIn from './PleaseLogIn.jsx';
import Ideas from './Ideas.jsx';
import PrivateMessageForm from './PrivateMessageForm.jsx'
// import Notifications from './Notifications.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session_id: '',
      username: '',
      name: '',
      projects: [],
      userId: null,
      techFilter: [],
      isCheckingLogIn: false,
      shouldRedirectProject: false,
      shouldRedirectBrainstorm: false,
      githubRepos: [],
      isViewFilter: false,
    };

    this.checkSignIn = this.checkSignIn.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.searchByUserInput = this.searchByUserInput.bind(this);
    this.getProjectsByTechs = this.getProjectsByTechs.bind(this);
    this.handleTechs = this.handleTechs.bind(this);
    this.handleGetLatest = this.handleGetLatest.bind(this);
    this.handleProjectRedirect = this.handleProjectRedirect.bind(this);
    this.handleBrainstormRedirect = this.handleBrainstormRedirect.bind(this);
    this.getGithubRepos = this.getGithubRepos.bind(this);
    this.getProjectInfoByProjectId = this.getProjectInfoByProjectId.bind(this);
    this.filterByViews = this.filterByViews.bind(this);
    this.toggleViewFilter = this.toggleViewFilter.bind(this);
  }

  componentWillMount() {
    this.checkSignIn();
  }

  checkSignIn() {
    this.setState({
      isCheckingLogIn: true
    }, function () {
      axios.get('/checkSession')
        .then((response) => {
          this.setState({
            isCheckingLogIn: false,
            session_id: response.data.session_id,
            username: response.data.git_username,
            name: response.data.name,
            userId: response.data.id
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  getProjects() {
    axios.get('/projects')
      .then((response) => {
        this.setState({
          projects: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchByUserInput(result) {
    axios.get(`/searchProjects?title=${result[0].project_name}`)
      .then((response) => {
        this.setState({
          projects: response.data
        });
      })
      .catch((error) => {
        console.log('check access token error');
      });
  }

  getProjectInfoByProjectId(projectId) {
    axios.get(`/projects/${projectId}`)
      .then((response) => {
        const techStackHtml = response.data[1].map((tech) =>
        <li className="ui label" key={tech.toString()}>
          {tech}
        </li>
        );

        this.setState({
          projectName: response.data[0].project_name,
          description: response.data[0].description,
          githubRepo: response.data[0].repo_url,
          techs: techStackHtml,
          githubUser: response.data[0].user.git_username,
          projectThumb: response.data[0].image_Url,
          testUser: response.data[0].user.git_username
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getProjectsByTechs(techs) {
    const techQuery = queryString.stringify({
      techs
    });
    axios.get(`/projects?${techQuery}`)
      .then((response) => {
        this.setState({
          projects: response.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getGithubRepos() {
    axios.get('/githubRepos')
      .then(response => this.setState({ githubRepos: response.data }))
      .catch(err => console.log(err));
  }

  handleTechs(e, data) {
    this.setState({ techFilter: data.value }, function () {
      this.getProjectsByTechs(this.state.techFilter);
    });
  }

  handleGetLatest() {
    this.setState({ techFilter: [], isViewFilter: false }, () => this.getProjects());
  }

  handleProjectRedirect() {
    this.setState({ shouldRedirectProject: !this.state.shouldRedirectProject });
  }
  handleBrainstormRedirect() {
    this.setState({ shouldRedirectBrainstorm: !this.state.shouldRedirectProject });
  }
  filterByViews() {
    axios.get('/projects?views=true')
      .then(response => this.setState({ projects: response.data, isViewFilter: true }))
      .catch(err => console.log(err));
  }

  toggleViewFilter() {
    this.setState({ isViewFilter: !this.state.isViewFilter });
  }

  handleSendMessage(messageInfo) {
    console.log('sending message :', messageInfo);
    axios.post('/privateMessages', {
      messageInfo
    })
      .then(response => console.log('Message Sent!'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <div>
          <NavHeader
            sessionId={this.state.session_id}
            username={this.state.username}
            name={this.state.name}
            handleProjectRedirect={this.handleProjectRedirect}
            handleBrainstormRedirect={this.handleBrainstormRedirect}
          />
          <Switch>
            <RouteProps
              exact
              path="/"
              component={App}
              sessionId={this.state.session_id}
              username={this.state.username}
              name={this.state.name}
              projects={this.state.projects}
              techFilter={this.state.techFilter}
              checkSignIn={this.checkSignIn}
              getProjects={this.getProjects}
              searchByUserInput={this.searchByUserInput}
              getProjectsByTechs={this.getProjectsByTechs}
              handleGetLatest={this.handleGetLatest}
              handleTechs={this.handleTechs}
              githubRepos={this.state.githubRepos}
              getGithubRepos={this.getGithubRepos}
              filterByViews={this.filterByViews}
              isViewFilter={this.state.isViewFilter}
              toggleViewFilter={this.toggleViewFilter}
            />
            <RouteProps
              path="/create"
              component={UploadForm}
              sessionId={this.state.session_id}
              username={this.state.username}
              userId={this.state.userId}
              handleProjectRedirect={this.handleProjectRedirect}
              shouldRedirectProject={this.state.shouldRedirectProject}
            />
            <RouteProps
              path="/PleaseLogIn"
              component={PleaseLogIn}
              shouldRedirectProject={this.state.shouldRedirectProject}
              shouldRedirectBrainstorm={this.state.shouldRedirectBrainstorm}
            />
            <RouteProps
              path="/apps/:id"
              component={Project}
              username={this.state.username}
              getProjectInfoByProjectId={this.state.getProjectInfoByProjectId}
            />
            <RouteProps
              path="/users/:username"
              component={Developer}
              sessionId={this.state.session_id}
              username={this.state.username}
              name={this.state.name}
              id={this.state.userId}
            />
            <RouteProps
              path="/ideas"
              component={Ideas}
              username={this.state.username}
              name={this.state.name}
              handleBrainstormRedirect={this.handleBrainstormRedirect}
              shouldRedirectBrainstorm={this.shouldRedirectBrainstorm}
            />
            <RouteProps
              path="/sendMessage"
              component={PrivateMessageForm}
              handleSendMessage={this.handleSendMessage}
              userId={this.state.userId}
            />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default Root;
