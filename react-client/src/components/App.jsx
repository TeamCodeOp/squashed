import React from 'react';
import NavHeader from './NavHeader.jsx';
import Search from './Search.jsx';
import NewProjects from './NewProjects.jsx';
import Footer from './Footer.jsx';

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
        <NavHeader />
        <Search />
        <NewProjects />
        <Footer />
      </div>);
  }
}
export default App;
