import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import RouteProps from 'react-route-props';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App.jsx';
import NavHeader from './NavHeader.jsx';
import AddProject from './AddProject.jsx';
import Developer from './Developer.jsx';
import Project from './Project.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session_id: '',
      username: '',
      name: '',
      projects: []
    };

    this.checkSignIn = this.checkSignIn.bind(this);
    this.getProjects = this.getProjects.bind(this);
  }

  checkSignIn() {
    axios.get('/checkSession')
      .then((response) => {
        this.setState({
          session_id: response.data.session_id,
          username: response.data.git_username,
          name: response.data.name,
          userId: response.data.id
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getProjects() {
    console.log('checking for projects...');
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

  render() {
    return (
      <Router>
        <div>
          <NavHeader
            sessionId={this.state.session_id}
            username={this.state.username}
            name={this.state.name}
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
              checkSignIn={this.checkSignIn}
              getProjects={this.getProjects}
            />
            <RouteProps
              path="/create"
              component={AddProject}
              sessionId={this.state.session_id}
              username={this.state.username}
              name={this.state.name}
            />
            <Route exact path="/" component={App} />
            <Route path="/create" component={AddProject} />
            <Route path="/:username" component={Developer} />
            <Route path="/project" component={Project} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Root;
