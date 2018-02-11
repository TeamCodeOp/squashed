import React from 'react';
import { Form } from 'semantic-ui-react';

class PrivateMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messageText: '', subject: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
  }

  handleChange(e) {
    this.setState({
      messageText: e.target.value
    }, () => console.log(this.state.messageText));
  }

  handleSubject(e) {
    this.setState({
      subject: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const messageInfo = {
      senderId: this.props.userId,
      senderUsername: this.props.username,
      senderName: this.props.name,
      recipientUsername: this.props.location.search.slice(4),
      content: this.state.messageText,
      subject: this.state.subject
    };
    console.log('msgInfo', messageInfo);
    this.props.handleSendMessage(messageInfo);
  }

  render() {
    const { value } = this.state;
    return (
      <Form>
        <Form.Input
          label="Subject"
          placeholder="Subject"
          onChange={this.handleSubject}
        />
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
