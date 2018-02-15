import React from 'react';
import { List, Header } from 'semantic-ui-react';
import MessageListItem from './MessageListItem.jsx';

const MessageList = ({ messages, handleDeleteMessage, handlePM }) => (
  <div id="messageList">
    <List celled>
      {messages.map(message =>
        (
          <MessageListItem
            key={message.id}
            message={message}
            style={{ width: '500px' }}
            handleDeleteMessage={handleDeleteMessage}
            handlePM={handlePM}
          />
        )
      )}
    </List>
  </div>
);

export default MessageList;
