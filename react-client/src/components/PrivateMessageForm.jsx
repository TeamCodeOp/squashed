import React from 'react';
import { Form } from 'semantic-ui-react';

class PrivateMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messageText: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      messageText: e.target.value
    }, () => console.log(this.state.messageText));
  }

  handleSubmit(e) {
    e.preventDefault();
    const messageInfo = {
      senderId: this.props.userId,
      recipientId: this.props.location.search.slice(4),
      timeStamp: new Date(),
      content: this.state.messageText
    };
    this.props.handleSendMessage(messageInfo);
  }

  render() {
    const { value } = this.state;
    return (
      <Form>
        <Form.TextArea
          label="Message"
          placeholder="Your thoughts here..."
          onChange={this.handleChange}
        />
        <Form.Button onClick={this.handleSubmit} >Send</Form.Button>
      </Form>
    );
  }
}

export default PrivateMessageForm;
