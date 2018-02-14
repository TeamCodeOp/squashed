import React, { Component } from 'react';
import { Menu, Segment, Grid } from 'semantic-ui-react';
import UserProjectList from './UserProjectList.jsx';
import MessageList from './MessageList.jsx';

export default class ProfileTabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: '' };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menuTab === 'inbox' || (nextProps.username && (nextProps.username === nextProps.profileUsername))) {
      this.setState({ activeItem: 'Inbox' });
    } else {
      this.setState({ activeItem: 'Projects' });
    }
  }
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name="Projects" active={activeItem === 'Projects'} onClick={this.handleItemClick} />
          {(this.props.username && (this.props.username === this.props.profileUsername)) &&
            <Menu.Item name="Inbox" active={activeItem === 'Inbox'} onClick={this.handleItemClick} />
          }
        </Menu>

        <Segment>
          {this.state.activeItem === 'Projects' &&
            <Grid>
              {this.props.projects.map((project, i) => {
                if (i % 3 === 0 && i <= this.props.projects.length - 1) {
                  return <UserProjectList key={i} items={this.props.projects.slice(i, i + 3)} />;
                }
              })}
            </Grid>
          }

          {(this.state.activeItem === 'Inbox' && (this.props.username && (this.props.username === this.props.profileUsername))) &&
          <MessageList
            messages={this.props.messages}
            handleDeleteMessage={this.props.handleDeleteMessage}
            handlePM={this.props.handlePM}
          />
          }
        </Segment>
      </div>
    );
  }
}
