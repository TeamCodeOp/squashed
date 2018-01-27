import React from 'react';
import NavHeader from './NavHeader.jsx';
import Search from './Search.jsx';
import NewProjects from './NewProjects.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('App mounted');
  }

  render() {
    return (
      <div>
        <Search />
        <NewProjects />
      </div>);
  }
}
export default App;
