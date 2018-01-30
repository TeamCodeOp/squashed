import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Menu>
        <Menu.Item
          as={Link}
          to="/"
          name="Home"
        />
        <Menu.Item
          as={Link}
          to={this.props.username ? '/create' : '/create'}
          name="Add Project"
        />
        <Menu.Menu position="right">
          {this.props.username ?
            <Menu.Item
              href="/logout"
              icon="github"
              name="Logout"
            />
            : <Menu.Item
              href="/auth/github"
              icon="github"
              name="Login"
            />
          }
          {this.props.username ?
            <Menu.Item name={this.props.username} />
            : <Menu.Item name="My Account" />
          }
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavHeader;
