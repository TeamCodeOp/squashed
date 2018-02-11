import React from 'react';
import { Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MessageListItem = ({ message }) => (
  <List.Item>
    <Image
      avatar
      src={message.sender_img}
      as={Link}
      to={`/users/${message.sender_username}`}
    />
    <List.Content>
      <List.Header>{message.subject}</List.Header>
      {`${message.sender_name} -- ${message.content}`}
    </List.Content>
  </List.Item>
);

export default MessageListItem;
