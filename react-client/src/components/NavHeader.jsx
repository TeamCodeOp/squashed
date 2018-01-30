import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e, { name }) {
    this.setState({
      activeItem: name
    });
  }

  render() {
    const { activeItem } = this.state;
    console.log(this.props);
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
          {this.props.username ?
          <Menu.Item href="/logout"
            icon='github'
            name='Logout'
            active={activeItem === 'Logout'}
            onClick={this.onButtonClick}
          >
          </Menu.Item>
        : <Menu.Item href="/auth/github"
            icon='github'
            name='Login'
            active={activeItem === 'Login'}
            onClick={this.onButtonClick}
          >
          </Menu.Item>
        }
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavHeader;
