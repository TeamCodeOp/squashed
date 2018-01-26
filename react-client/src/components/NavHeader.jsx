import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class NavHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item
          name='reviews'
          active={activeItem === 'Login'}
          onClick={this.handleItemClick}
        >
          Login
        </Menu.Item>

        <Menu.Item
          name='Add Project'
          active={activeItem === 'Add Project'}
          onClick={this.handleItemClick}
        >
          Add Project
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavHeader;
