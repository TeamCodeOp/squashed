import React from 'react';
import { Image, List, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MessageListItem = ({ message, handleDeleteMessage }) => (
  <List.Item>
    <Image
      avatar
      src={message.sender_img}
      as={Link}
      to={`/users/${message.sender_username}`}
    />
    <List.Content>
      <List.Header>
        <span>{message.subject}</span>
        <span style={{ float: 'right' }}>
          <Dropdown icon="vertical ellipsis" floating className="icon">
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/sendMessage?to=${message.sender_id}`}
              >
                Reply
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDeleteMessage(message.id, message.recipient_id)}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
      </List.Header>
      {`${message.sender_name} -- ${message.content}`}

    </List.Content>
  </List.Item>
);

export default MessageListItem;
