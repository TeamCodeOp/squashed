import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onButtonClick(e, { name }) {
    this.setState({
      activeItem: name
    });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item as={Link} to="/"
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.onButtonClick}
        >
          Home
        </Menu.Item>

        <Menu.Item as={Link} to="/create"
          name='Add Project'
          active={activeItem === 'Add Project'}
          onClick={this.onButtonClick}
        >
          Add Project
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            icon='github'
            name='Login'
            active={activeItem === 'Login'}
            onClick={this.onButtonClick}
          >
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavHeader;
