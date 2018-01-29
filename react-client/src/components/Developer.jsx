import React from 'react';
import { Header, Icon, Card, Grid, Image } from 'semantic-ui-react';

class Developer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      description: '',
      githubRepo: '',
      techs: [],
      uploadedFileCloudinaryUrl: ''
    };

  }


  render() {
    return (
      <div>
        <Grid columns='equal'>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={4}>
            <Header as='h3' textAlign='center'>
              Developer
            </Header>
            <Card>
              <Image src='https://avatars0.githubusercontent.com/u/583231?s=460&v=4' />
              <Card.Content>
                <Card.Header>
                  Ralph
                </Card.Header>
                <Card.Meta>
                  <span className='githubUsername'>
                    @ralphplumley
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
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Developer;