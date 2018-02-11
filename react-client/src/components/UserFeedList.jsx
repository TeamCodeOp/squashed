import React from 'react';
import { Feed, Image } from 'semantic-ui-react';

const UserFeedList = ({ feed }) => {
  return (
    <div className="ui feed">
      <div className="event">
        <div className="label">
          <Image src={feed.avatar_url} />
        </div>
        <div className="content">
          <div className="summary">
            <a className="user">
              {feed.git_username}
            </a>
            <a id='feed'>
              {feed.event}
            </a>
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
};

export default UserFeedList;