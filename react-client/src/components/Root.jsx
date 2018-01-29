import React from 'react';
import PropTypes from 'prop-types';
import RouteProps from 'react-route-props';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavHeader from './NavHeader.jsx';
import App from './App.jsx';
import AddProject from './AddProject.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session: '',
      username: ''
    };
  }

  componentWillMount() {
    axios.get('/checkSession')
      .then((response) => {
        this.setState({
          session: response.data.location.search
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
          <NavHeader session={this.state.session}/>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/create" component={AddProject} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Root;
