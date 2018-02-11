import React from 'react';
import { List, Header } from 'semantic-ui-react';
import MessageListItem from './MessageListItem.jsx';

const MessageList = ({ messages }) => (
  <div>
    <Header>Messages</Header>
    <List celled>
    {messages.map((message, i) =>
      <MessageListItem key={i} message={message} style={{ width: '500px' }} />
    )}
    </List>
  </div>
);

export default MessageList;
