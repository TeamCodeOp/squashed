import React from 'react';
import { List, Header } from 'semantic-ui-react';
import MessageListItem from './MessageListItem.jsx';

const MessageList = ({ messages, handleDeleteMessage, handleReply }) => (
  <div style={{ margin: 'auto', width: '40%', marginTop: '5em', borderRadius: '10px', border: '1px solid rgba(34,36,38,.15)', padding: '2em' }}>
    <Header>Messages</Header>
    <List celled>
      {messages.map((message, i) =>
        (
          <MessageListItem
            key={i}
            message={message}
            style={{ width: '500px' }}
            handleDeleteMessage={handleDeleteMessage}
            handleReply={handleReply}
          />
        )
      )}
    </List>
  </div>
);

export default MessageList;
