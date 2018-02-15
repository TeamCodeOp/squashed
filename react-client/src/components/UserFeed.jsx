import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Feed, Image } from 'semantic-ui-react';
import axios from 'axios';
import UserFeedList from './UserFeedList.jsx';


class UserFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFeeds: [],
      follower_gitName: "",

    };
    this.getFollowerName = this.getFollowerName.bind(this);
  }

  componentDidMount() {
    axios.get('/notifications')
      .then((response) => {
        this.setState({
          userFeeds: response.data
        });
        console.log('RESPONSE', response.data);
      }, () => { this.getFollowerName(); })
      .catch((error) => {
        console.log(error);
      });
      //this.getFollowerName();
  }

  getFollowerName() {
    console.log('called');
    for (let i = 0; i < this.state.userFeeds.length; i++) {
      console.log(this.state.userFeeds[i].event);
      if (this.state.userFeeds[i].event.includes("following")) {
        console.log('inside if');
        let name = this.state.userFeeds[0].event.split(" ");
        let gitName = name[name.length - 1];
        this.setState({
          follower_gitName : gitName
        });
      }
    }
  }

  render() {
    console.log('Hello', this.state);
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

