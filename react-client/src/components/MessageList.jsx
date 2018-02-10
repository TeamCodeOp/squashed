import React from 'react';
import { Image, List } from 'semantic-ui-react';

const MessageList = () => (
  <List celled>
    <List.Item>
      <Image avatar src='/assets/images/avatar/small/helen.jpg' />
      <List.Content>
        <List.Header>Snickerdoodle</List.Header>
        An excellent companion
      </List.Content>
    </List.Item>
  </List>
);

export default MessageList;
