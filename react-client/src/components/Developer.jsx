import React from 'react';
import { Header, Icon, Card, Grid, Image, Container, Button, Segment, Popup, Input } from 'semantic-ui-react';
import axios from 'axios';
import UserProjectList from './UserProjectList.jsx';
import io from 'socket.io-client';

class Developer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      userAvatar: '',
      projects: [],
      messages: []
    };

    this.socket = io().connect();
  }

  componentDidMount() {
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

  render() {
    const firstName = this.state.name.split(' ')[0];

    const Chatbox = (
      <div style={{ width: '300px'}}>
        <Header as='h4' attached='top' style={{backgroundColor: '#e0e1e2'}}>{firstName}</Header>
        <Segment attached>
          <p>Dan: hello</p>
          <p>Ralph: hi there!</p>
        </Segment>
        <Segment attached>
        <Input
          placeholder='...'
          action='send'
          style={{
            width: '270px',
            margin: '0 auto'
          }}
        />
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