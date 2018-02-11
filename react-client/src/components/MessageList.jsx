import React from 'react';
import { List } from 'semantic-ui-react';
import MessageListItem from './MessageListItem.jsx';

const MessageList = ({ messages }) => (
  <List celled>
    {messages.map((message, i) =>
      <MessageListItem key={i} message={message} style={{ width: '500px' }} />
    )}
  </List>
);

export default MessageList;
