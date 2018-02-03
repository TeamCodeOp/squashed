import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Header, Icon, Card, Grid, Image, Container, Button, Segment, Popup, Input, Form, List } from 'semantic-ui-react';
import UserProjectList from './UserProjectList.jsx';

const socket = io.connect();

let newMessage;

class Developer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      userAvatar: '',
      projects: [],
      messages: [],
      following: [],
      followers: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    socket.on('messageAdded', message =>
      this.setState({
        name: message.sender,
        messages: this.state.messages.concat(message)
      })
    );
  }

  componentDidMount() {
    socket.emit('registerSocket', this.props.name);

    axios.get(`/developers/${this.props.match.params.username}`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          username: response.data.git_username,
          userAvatar: response.data.avatar_url,
          projects: response.data.projects,
          following: response.data.following,
          followers: response.data.followers
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    axios.get(`/developers/${nextProps.match.params.username}`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          username: response.data.git_username,
          userAvatar: response.data.avatar_url,
          projects: response.data.projects
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(e, { msgInput, value }) {
    this.setState({
      msgInput: value
    });

    newMessage = {
      sender: this.props.name,
      receiver: this.state.name,
      text: e.target.value
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      messages: this.state.messages.concat(newMessage),
      msgInput: ''
    });


    // sends newMessage object to server
    socket.emit('messageAdded', newMessage);
  }

  render() {
    const firstName = this.state.name.split(' ')[0];
    const messages = this.state.messages.map((msg, i) => {
      return <p className='messageList' key={i}>{msg.sender}: {msg.text}</p>
    });
    const { msgInput } = this.state

    return (

      <div>
        <Grid columns='equal'>
          <Grid.Column width={2} />
          <Grid.Column width={4}>
            <Card>
              <Image src={`${this.state.userAvatar}`} />
              <Card.Content>
                <Card.Header>
                  {this.state.name}
                </Card.Header>
                <Card.Meta>
                  <span className='githubUsername'>
                    <a href={`https://github.com/${this.state.username}`}>{this.state.username}</a>
                  </span>
                </Card.Meta>
                <Card.Description>
                  Full-stack engineer with a background in UI/UX.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>

                {/* <div id="following">
                  <Icon name='user' />
                  {`${this.state.following.length}`}
                </div>
                <div id="followers">
                  <Icon name='user' />
                  {`${this.state.followers.length}`}
                </div> */}

              <div className="extra content">
                <span className="left floated like">
                  <i className="user icon"></i>
                  Following: <b>{`${this.state.following.length}`}</b>
                </span>
                <span className="right floated star">
                  <i className="user icon"></i>
                  Followers: <b>{`${this.state.followers.length}`}</b>
                </span>
              </div>

              </Card.Content>
            </Card>

            {(this.props.sessionId) && ((this.state.messages.length > 0) || (this.state.name !== this.props.name)) ?
              <div style={{ width: '290px'}}>
                <Header as='h4' attached='top' style={{backgroundColor: '#e0e1e2'}}>{firstName}</Header>
                <Segment attached>
                  {messages}
                </Segment>
                <Segment attached>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Input placeholder='...' name='input' value={msgInput} onChange={this.handleChange}/>
                    <Form.Button content='Send' size='small'/>
                  </Form.Group>
                </Form>
                </Segment>
              </div>
            : null }

          </Grid.Column>
          <Grid.Column width={8}>
            <Container style={{ textAlign: 'center' }}>
              <Header as='h3' textAlign='center'>
                Projects
              </Header>
              <Grid>
                {this.state.projects.map((project, i) => {
                  if (i % 3 === 0 && i <= this.state.projects.length - 1) {
                    return <UserProjectList key={i} items={this.state.projects.slice(i, i + 3)} />;
                  }
                })}
              </Grid>
            </Container>
          </Grid.Column>
          <Grid.Column width={2} />
        </Grid>

      </div>
    );
  }
}

export default Developer;