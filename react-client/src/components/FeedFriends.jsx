import React from 'react';
import UserFeed from './UserFeed.jsx';

class FeedFriends extends React.Component {
  render() {
    return (
      <div id="feedContainer">
        <UserFeed />
      </div>
    );
  }
}

export default FeedFriends;
