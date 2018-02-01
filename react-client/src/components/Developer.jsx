import React from 'react';
import { Header, Icon, Card, Grid, Image, Container } from 'semantic-ui-react';
import axios from 'axios';
import UserProjectList from './UserProjectList.jsx';

class Developer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      userAvatar: '',
      projects: []
    };
  }

  componentDidMount() {
    axios.get(`/developers/${this.props.match.params.username}`)
      .then((response) => {
        console.log(response);
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
    return (
      <div>
        <Grid columns='equal'>
          <Grid.Column width={2} />
          <Grid.Column width={4}>
            <Header as='h3' textAlign='center'>
              Developer
            </Header>
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
            </Card>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as='h3' textAlign='center'>
              Projects
            </Header>
            <Container style={{ textAlign: 'center' }}>
              <Grid>
                {this.state.projects.map((project, i) => {
                  if (i % 3 === 0 && i < this.state.projects.length - 1) {
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