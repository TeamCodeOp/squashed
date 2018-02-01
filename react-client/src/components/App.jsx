import React from 'react';
import NavHeader from './NavHeader.jsx';
import Search from './Search.jsx';
import NewProjects from './NewProjects.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.checkSignIn();
    this.props.getProjects();

    // console.log('App mounted');
    // GET request to '/projects' to get projects
  }

  render() {
    return (
      <div>
        <Search />
        <NewProjects
          projects={this.props.projects}
        />
      </div>);
  }
}
export default App;
