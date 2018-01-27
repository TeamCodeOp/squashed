import React from 'react';
import PropTypes from 'prop-types';
import RouteProps from 'react-route-props';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavHeader from './NavHeader.jsx';
import App from './App.jsx';
import AddProject from './AddProject.jsx';

const Root = ({ store }) => (
  <Provider store={store}>

    <Router>
      <div>
        <NavHeader />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/create" component={AddProject} />
        </Switch>
      </div>
    </Router>

  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
