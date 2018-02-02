import React from 'react';
import axios from 'axios';
import ReactDisqusThread from 'react-disqus-thread';
import { Grid, Image, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      description: '',
      githubRepo: '',
      techs: [],
      githubUser: '',
      projectThumb: ''
    };
  }

  componentDidMount() {
    // console.log('thispropsmatch: ', this.props.match);

    axios.get(`/projects/${this.props.match.params.id}`)
      .then((response) => {
        // console.log('response data on line 20: ', response)
        this.setState({
          projectName: response.data.project_name,
          description: response.data.description,
          githubRepo: response.data.repo_url,
          techs: response.data.category,
          githubUser: response.data.user.git_username,
          projectThumb: response.data.image_Url
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Grid columns='equal'>
        <Grid.Column></Grid.Column>
        <Grid.Column width={12}>
          <Item.Group>
            <Item style={{
              padding: '2em',
              border: '1px solid rgba(0,0,0,.4)',
            }}>
              <a href={this.state.githubRepo} target="_blank">
              <Item.Image
                size='small'
                src={this.state.projectThumb || 'https://avatars0.githubusercontent.com/u/583231?s=460&v=4'}
                style={{ paddingRight: '20px', width: '200px', height: 'auto' }}
              />
              </a>
              <Item.Content>
                <Item.Header><a href={this.state.githubRepo} target="_blank">{this.state.projectName}</a></Item.Header>
                <Item.Meta>by <Link to={`/users/${this.state.githubUser}`}>{this.state.githubUser}</Link></Item.Meta>
                <Item.Description>
                  {this.state.description}
                </Item.Description>
                <Item.Extra style={{marginTop: '20px'}}>Tech Stack</Item.Extra>
                <Item.Description>
                  {this.state.techs}
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
          <ReactDisqusThread
            shortname="CodeOp"
            identifier={this.props.match.params.id}
            title="CodeOp"
            url={`https://codeop28.herokuapp.com/apps/${this.props.match.params.id}` || `http://localhost:3000/apps/${this.props.match.params.id}`}
            onNewComment={this.handleNewComment}
          />
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    );
  }
}

export default Project;