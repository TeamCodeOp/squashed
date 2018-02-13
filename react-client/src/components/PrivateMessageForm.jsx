import React from 'react';
import { Form, Header } from 'semantic-ui-react';

class PrivateMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messageText: '', subject: props.replySubject ? `RE:${props.replySubject}` : '' };

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
      recipientUsername: this.props.recipient || this.props.location.search.slice(4),
      content: this.state.messageText,
      subject: this.state.subject
    };
    this.props.handleSendMessage(messageInfo);
    this.setState({ messageText: '', subject: '' }, () => {
      if (this.props.type === 'reply') {
        this.props.hideReply();
      }
    });
  }

  render() {
    const { subject, messageText } = this.state;
    return (
      <div>
        <Header>Message to {this.props.recipient || this.props.location.search.slice(4)}</Header>
        <Form>
          <Form.Input
            label="Subject"
            placeholder="Subject"
            value={subject}
            onChange={this.handleSubject}
          />
          <Form.TextArea
            label="Message"
            value={messageText}
            placeholder="Your thoughts here..."
            onChange={this.handleChange}
          />
          <Form.Button onClick={this.handleSubmit} >Send</Form.Button>
        </Form>
      </div>
    );
  }
}

export default PrivateMessageForm;
