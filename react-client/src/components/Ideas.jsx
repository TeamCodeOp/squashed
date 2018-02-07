import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ReactDisqusThread from 'react-disqus-thread';
import { Grid, Header, Icon, Segment, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router';

// const socket = io.connect();
let groupMessage;

let socket;
if (process.env.NODE_ENV === 'production') {
  socket = io.connect();
} else {
  socket = io.connect('http://localhost:3000');
}

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
      return <p className='messageList' key={i}><span style={{fontWeight: 'bold'}}>{msg.sender}:</span> <span>{msg.text}</span></p>
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
          <Segment.Group horizontal style={{ width: '70%'}} >
            <Segment style={{ width: '70%'}}>
            <Grid.Column width={10}>
              <div style={{ width: '100%'}} >
                <Segment
                  id="messageBox"
                  attached
                  style={{ height: '500px', overflowY: 'scroll', border:'none'}}
                >
                  {messages}
                </Segment>
                <Segment attached style={{ border: 'none' }}>
                <Form onSubmit={this.handleSubmit} id="groupChatInput">
                  <Form.Input style={{width: '100%'}} placeholder='Type something...' name='input' value={msgInput} onChange={this.handleChange} action='Send'/>
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
                    return <li key={i} ><Icon color='green' size='large' name='check circle'/><Link to={`/users/${this.props.username}`} style={{ color: 'black' }}>{user}</Link></li>;
                  })}
              </ul>
            </Grid.Column>
          </Segment>
          </Segment.Group>
          <Grid.Column />
        </Grid>
    </div>
  )
  }
}

export default Ideas;