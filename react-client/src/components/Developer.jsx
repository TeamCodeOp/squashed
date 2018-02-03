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
      messages: [{
        text: ''
      }]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    socket.on('messageAdded', message =>
      // console.log(message)
      this.setState({
        messages: this.state.messages.concat(message)
      })
    );

    axios.get(`/developers/${this.props.match.params.username}`)
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


  handleChange(e) {
    newMessage = {
      text: e.target.value
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      messages: this.state.messages.concat(newMessage)
    });

    socket.emit('messageAdded', newMessage);
  }

  render() {
    const firstName = this.state.name.split(' ')[0];
    const messages = this.state.messages.map((msg, i) => {
      return <p className='messageList' key={i}>{firstName}: {msg.text}</p>
    });

    const Chatbox = (
      <div style={{ width: '300px'}}>
        <Header as='h4' attached='top' style={{backgroundColor: '#e0e1e2'}}>{firstName}</Header>
        <Segment attached>
          {messages}
        </Segment>
        <Segment attached>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='...' name='input' onChange={this.handleChange}/>
            <Form.Button content='Submit' />
          </Form.Group>
        </Form>
        </Segment>
      </div>
    );

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
                <a>
                  <Icon name='user' />
                  22 Friends
                </a>
              </Card.Content>
              <Card.Content extra>
                <Popup
                  trigger={<Button color='green' content='Chat' floated='left' size='mini'/>}
                  content={Chatbox}
                  on='click'
                  position='bottom left'
                />
              </Card.Content>
            </Card>
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