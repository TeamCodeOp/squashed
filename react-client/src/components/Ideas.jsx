import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ReactDisqusThread from 'react-disqus-thread';
import { Grid, Header, Icon, Segment, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router';

const socket = io.connect();
let groupMessage;

class Ideas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userSockets: {},
      messages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    socket.on('broadcast', (data) => {
      this.setState({
        userSockets: data
      });
      if (this.props.shouldRedirectBrainstorm) {
        this.props.handleBrainstormRedirect();
      }
    });

    socket.on('groupMessageAdded', (message) => {
      this.setState({
        messages: this.state.messages.concat(message)
      });
    });
  }

  componentDidMount() {
    socket.emit('registerSocket', this.props.name);
  }

  handleChange(e, { msgInput, value }) {
    this.setState({
      msgInput: value
    });

    groupMessage = {
      sender: this.props.name,
      text: e.target.value
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      messages: this.state.messages.concat(groupMessage),
      msgInput: ''
    });

    // sends newMessage object to server
    socket.emit('groupMessageAdded', groupMessage);
  }

  render() {
    const messages = this.state.messages.map((msg, i) => {
      return <p className='messageList' key={i}>{msg.sender}: {msg.text}</p>
    });
    const { msgInput } = this.state

    return (
      <div>
        <Header as="h2" icon textAlign="center" >
          <Icon name="idea" color="yellow" size="small"/>
          Share your ideas.
        </Header>
        <Grid columns="equal">
          <Grid.Column />
          <Segment.Group horizontal style={{ width: '70%'}}>
            <Segment>
            <Grid.Column width={8}>
              <div style={{ width: '100%'}}>
                <Segment
                  attached
                  style={{ height: '500px', overflowY: 'scroll'}}
                >
                  {messages}
                </Segment>
                <Segment attached id="groupChatInput">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Input placeholder='Type something...' name='input' value={msgInput} onChange={this.handleChange}/>
                    <Form.Button content='Send' size='small' floated='right'/>
                  </Form.Group>
                </Form>
                </Segment>
              </div>
            </Grid.Column>
          </Segment>
          <Segment>
            <Grid.Column width={2}>
              <Header as="h4" style={{textAlign: 'center'}}>
              There are {Object.keys(this.state.userSockets).length} users online.
              </Header>
              <ul style={{height: '500px'}}>
                  {Object.keys(this.state.userSockets).map((user, i) => {
                    return <li key={i}><Icon color='green' size='large' name='check circle'/>{user}</li>;
                  })}
              </ul>
            </Grid.Column>
          </Segment>
          </Segment.Group>
          <Grid.Column width={8}>
            <div style={{ width: '100%'}}>
              <Segment
                attached
                style={{ height: '500px', overflowY: 'scroll'}}
              >
                {messages}
              </Segment>
              <div id="groupChatInput">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Input placeholder='Type something...' name='input' value={msgInput} onChange={this.handleChange}/>
                  <Form.Button content='Send' size='small' floated='right'/>
                </Form.Group>
              </Form>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column />
        </Grid>
    </div>
  )
  }
}

export default Ideas;