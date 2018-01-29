import React from 'react';
import PropTypes from 'prop-types';
import RouteProps from 'react-route-props';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavHeader from './NavHeader.jsx';
import App from './App.jsx';
import AddProject from './AddProject.jsx';
import Developer from './Developer.jsx';
import axios from 'axios';



class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session: '',
      username: '',
    };
  }


  componentWillMount() {
    axios.get('/checkSession')
      .then((response) => {
        console.log(response);
        this.setState({

        })
      })
  }




  render() {
    return (
      <Router>
        <div>
          <NavHeader />
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/create" component={AddProject} />
            <Route path="/developer" component={Developer} />
          </Switch>
        </div>
      </Router>
    )
  }

}




// Root.propTypes = {
//   store: PropTypes.object.isRequired
// };

export default Root;
