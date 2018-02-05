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
      fullName: '',
      name: '',
      username: '',
      userAvatar: '',
      projects: [],
      messages: [],
      following: [],
      followers: [],
      onlineStatus: false
    };

    console.log('line 26:', this.state.name);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFollowRequest = this.handleFollowRequest.bind(this);
  }

  // WHY IS THIS.STATE.NAME UNDEFINED???
  componentWillMount() {
    socket.on('broadcast', (data) => {
      if (data[this.state.name]) {
        this.setState({
          onlineStatus: true
        });
      } else {
        this.setState({
          onlineStatus: false
        });
      }
    });

    socket.on('messageAdded', (message) => {
      this.setState({
        name: message.sender,
        messages: this.state.messages.concat(message)
      });
    });
  }

  componentDidMount() {
    axios.get(`/developers/${this.props.match.params.username}`)
      .then((response) => {
        this.setState({
          fullName: response.data.name,
          name: response.data.name,
          username: response.data.git_username,
          userAvatar: response.data.avatar_url,
          projects: response.data.projects,
          following: response.data.following,
          followers: response.data.followers
        });

        if (this.props.name) {
          socket.emit('registerSocket', this.props.name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    axios.get(`/developers/${nextProps.match.params.username}`)
      .then((response) => {
        this.setState({
          fullName: response.data.name,
          name: response.data.name,
          username: response.data.git_username,
          userAvatar: response.data.avatar_url,
          projects: response.data.projects
        });
        console.log('line 89:', this.state.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    console.log(this.state.fullName, ' is leaving');
    socket.emit('userDisconnect', this.state.fullName);
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

  handleFollowRequest(e) {
    e.preventDefault();
    console.log('follow button clicked');

    // axios.post('/followRequest', {
    //   followed_user_id: this.props.userId,
    //   follower_id: this.props.userId
    // })
    //   .then((response) => {
    //     this.setState({
    //       projectName: '',
    //       description: '',
    //       githubRepo: '',
    //       techs: [],
    //       uploadedFileCloudinaryUrl: '',
    //       uploadedFile: ''
    //     });
    //     alert('Project added successfully');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  render() {

    console.log('--------------------state: ', this.state);
    console.log('--------------------props: ', this.props);
    
    const showFollowButton = (this.props.name !== this.state.name) && (this.props.sessionId !== undefined);
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
                  <span>{this.state.fullName}</span>
                {this.state.onlineStatus ?
                  <span style={{fontSize: '.5em', float: 'right', color: 'green'}}>
                    <Icon color='green' size='large' name='check circle'/>
                    ONLINE
                  </span> :
                  <span style={{fontSize: '.5em', float: 'right', color: 'red'}}>
                    <Icon color='red' size='large' name='remove circle'/>
                    OFFLINE
                  </span>
                }
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

              <Card.Content extra>
                <div>
                  {  showFollowButton ? <Button primary onClick={this.handleFollowRequest} >+ Follow</Button> : null }

                  {/* <button id="follow-button" className="ui right floated primary basic button">Follow</button> */}
                </div>
              </Card.Content>

            </Card>

            {(this.props.sessionId) && (this.state.onlineStatus) && ((this.state.messages.length > 0) || (this.state.name !== this.props.name)) ?
              <div style={{ width: '290px'}}>
                <Header as='h4' attached='top' style={{backgroundColor: '#e0e1e2', textAlign: 'center'}}>Chat with {firstName}</Header>
                <Segment
                  attached
                  style={{ height: '230px', overflowY: 'scroll'}}
                >
                  {messages}
                </Segment>
                <Segment attached>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group style={{ margin: 'auto'}}>
                    <Form.Input style={{ height: '35px'}}placeholder='Type something...' name='input' value={msgInput} onChange={this.handleChange}/>
                    <Form.Button style={{ height: '35px'}}content='Send' size='small'/>
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