import React, { Component } from 'react';
import { Menu, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';

class NavHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="navHeader">
        <Menu className="sticky">
          <Menu.Item
            id="squashedHomeButton"
            as={Link}
            to="/"
            name="Squashed"
          />
          <Menu.Item
            as={Link}
            to={this.props.sessionId ? '/create' : '/PleaseLogIn'}
            name="Add Project"
            onClick={!this.props.sessionId ? this.props.handleProjectRedirect : () => {}}
          />
          <Menu.Item
            as={Link}
            to={this.props.sessionId ? '/ideas' : '/PleaseLogIn'}
            name="Brainstorm"
            onClick={!this.props.sessionId ? this.props.handleBrainstormRedirect : () => {}}
          />
          
          {this.props.username ?
            <Menu.Menu position="right">
              <Menu.Item
                onClick={this.props.markAllOpened}
                as={Link}
                icon="mail"
                to={`/users/${this.props.username}?inbox`}
              />
              <NotificationBadge count={this.props.privateMessages.filter(msg => !msg.opened).length} effect={Effect.SCALE} />
              <Menu.Item
                as={Link}
                to={`/users/${this.props.username}`}
                name="My Profile"
              />
              <Menu.Item
                href="/logout"
                icon="github"
                name="Logout"
              />
            </Menu.Menu>
            :
            <Menu.Menu position="right">
              <Menu.Item
                href="/auth/github"
                icon="github"
                name="Login"
              />
            </Menu.Menu>
          }
        </Menu>
      </div>
    );
  }
}

export default NavHeader;
