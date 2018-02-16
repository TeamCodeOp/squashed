import React from 'react';
import { Feed, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
            {feed.project_id !== null ? <Link to={`/apps/${feed.project_id}`}>{`${feed.project_name}`}</Link> : <Link to={`/users/${feed.follower_name}`}>{`${feed.follower_name}`}</Link> }
            <div className="date">
              {moment(feed.created_date).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFeedList;

