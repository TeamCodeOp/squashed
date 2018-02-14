import React from 'react';
import axios from 'axios';
import ReactDisqusThread from 'react-disqus-thread';
import { Grid, Image, Item, Button, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router';
import Developer from './Developer.jsx';
import UploadForm from './UploadForm.jsx';

class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      description: '',
      githubRepo: '',
      techs: [],
      githubUser: '',
      projectThumb: '',
      testUser: '',
      open: false
    };

    this.onDelete = this.onDelete.bind(this);
    this.show = this.show.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    axios.get(`/projects/${this.props.match.params.id}`)
      .then((response) => {
        const techStackHtml = response.data[1].map(tech =>
          (
            <li className="ui label" key={tech.toString()}>
              {tech}
            </li>
          )
        );

        this.setState({
          projectName: response.data[0].project_name,
          description: response.data[0].description,
          githubRepo: response.data[0].repo_url,
          techs: techStackHtml,
          githubUser: response.data[0].user.git_username,
          projectThumb: response.data[0].image_Url,
          testUser: response.data[0].user.git_username
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onDelete() {
    axios.delete(`/projects/${this.props.match.params.id}`)
      .then((response) => {
        console.log('response data on line 45: ', response);
        this.setState({
          projectName: '',
          description: '',
          githubRepo: '',
          techs: '',
          githubUser: 1,
          projectThumb: '',
          open: false
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

    show(){
      this.setState({ open: true })
    }

  handleCancel() {
    this.setState({ open: false })
  }

  render() {
    if (this.state.githubUser === 1) {
      return (
        <Switch>
          <Redirect from={`/apps/${this.props.match.params.id}`} to={`/users/${this.state.testUser}`} />
          <Route path={`/users/${this.state.testUser}`} component={Developer} />
        </Switch>
      );
    } else if (this.props.username === this.state.githubUser) {
      return (
        <Grid columns="equal">
          <Grid.Column />
          <Grid.Column width={12}>
            <Item.Group>
              <Item style={{
                padding: '2em',
                border: '1px solid rgba(0,0,0,.4)',
              }}
              >
                <a href={this.state.githubRepo} target="_blank">
                  <Item.Image
                    size="small"
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

                  <Item.Extra style={{ marginTop: '20px' }}>Tech Stack</Item.Extra>
                  <Item.Description>
                    <ul id="project-techs">{this.state.techs}</ul>
                  </Item.Description>
                </Item.Content>

              </Item>
              <Button onClick={this.show}>Delete</Button>
              <Confirm
                id="ui.page"
                open={this.state.open}
                cancelButton='Never mind'
                confirmButton="Let's do it"
                onCancel={this.handleCancel}
                onConfirm={this.onDelete}
              />
              <button
                className="ui primary button"
                onClick={() => {
                  this.props.history.push({
                    pathname: '/create',
                    state: {
                      gitUser: this.state.githubUser,
                      projectName: this.state.projectName,
                      githubUrl: this.state.githubRepo,
                      description: this.state.description,
                      techStack: JSON.stringify(this.state.techs, null, 3),
                      projectId: this.props.match.params.id
                    }
                  });
                }
                }
              >
             Edit
              </button>
            </Item.Group>
            <ReactDisqusThread
              shortname="CodeOp"
              identifier={this.props.match.params.id}
              title="CodeOp"
              url={`https://codeop28.herokuapp.com/apps/${this.props.match.params.id}` || `http://localhost:3000/apps/${this.props.match.params.id}`}
              onNewComment={this.handleNewComment}
            />
          </Grid.Column>
          <Grid.Column />
        </Grid>
      );
    } else {
      return (
        <Grid columns="equal">
          <Grid.Column />
          <Grid.Column width={12}>
            <Item.Group>
              <Item style={{
                padding: '2em',
                border: '1px solid rgba(0,0,0,.4)',
              }}
              >
                <a href={this.state.githubRepo} target="_blank">
                  <Item.Image
                    size="small"
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
                    <ul id="project-techs">{this.state.techs}</ul>
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
          <Grid.Column />
        </Grid>
      );
    }
  }
}

export default Project;
