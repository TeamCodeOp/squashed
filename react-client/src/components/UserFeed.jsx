import React from 'react';
import { Feed, Image } from 'semantic-ui-react';

class UserFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAvatar: 'https://avatars0.githubusercontent.com/u/30578313?v=4',
      gitUser: 'tguvvala'
    };
  }

  render() {
    return (
      <div className="ui feed">
        <div className="event">
          <div className="label">
            <Image src={this.state.userAvatar} />
          </div>
          <div className="content">
           <div className="summary">
             <a className="user">
             {this.state.gitUser}
             </a> added you as a friend
             <div className="date">
              1 Hour Ago
             </div>
            </div>
          <div className="meta">
            <a className="like">
             <i className="like icon"></i> 4 Likes
            </a>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default UserFeed;

