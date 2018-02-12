import React from 'react';
import { Image, List, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const MessageListItem = ({ message, handleDeleteMessage }) => (
  <List.Item>
    <Image
      className="label"
      src={message.sender_img}
      as={Link}
      to={`/users/${message.sender_username}`}
    />
    <List.Content>
      <List.Header>
        {message.subject}
      </List.Header>
      <List.Description>{message.sender_name} -- {moment(message.time_sent).fromNow()}


        <Dropdown icon="vertical ellipsis" floating className="icon">
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={`/sendMessage?to=${message.sender_username}`}
            >
              Reply
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDeleteMessage(message.id, message.recipient_id)}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </List.Description>
      <div>
        {message.content}
      </div>
    </List.Content>
  </List.Item>
);

export default MessageListItem;
