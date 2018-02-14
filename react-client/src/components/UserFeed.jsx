import React from 'react';
import { Feed, Image } from 'semantic-ui-react';
import axios from 'axios';
import UserFeedList from './UserFeedList.jsx';
import { Scrollbars } from 'react-custom-scrollbars';

class UserFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFeeds: [],
    };
  }

  componentDidMount() {
    axios.get('/notifications')
      .then((response) => {
        this.setState({
          userFeeds: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Scrollbars style={{ height: 300 }}>
          {this.state.userFeeds.map((feed, i) =>
            <UserFeedList key={i} feed={feed} />
          )}
        </Scrollbars>
      </div>
    );
  }
}

export default UserFeed;

