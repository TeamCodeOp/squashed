import React from 'react';
import { Header, Icon, Form, Input, Grid, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

class AddProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      description: '',
      githubRepo: '',
      techs: [],
      projectImage: '',
    };

    this.handleTechs = this.handleTechs.bind(this);
    this.handleGitHubRepo = this.handleGitHubRepo.bind(this);
    this.handleProjectName = this.handleProjectName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleProjectName(e) {
    this.setState({
      projectName: e.target.value
    });
  }

  handleGitHubRepo(e) {
    this.setState({
      githubRepo: e.target.value
    });
  }

  handleDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/projects', {
      projectName: this.state.projectName,
      description: this.state.description,
      githubRepo: this.state.githubRepo,
      techs: this.state.techs,
      projectImage: this.state.projectImage
    })
      .then((response) => {
        this.setState({
          projectName: '',
          description: '',
          githubRepo: '',
          techs: [],
          projectImage: ''
        });
        alert('Project added successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleTechs(e, data) {
    console.log(data);
    this.setState({ techs: data.value });
  }

  render() {
    const {
      projectName, description, githubRepo, techs, screenshot
    } = this.state;
    const techOptions = [
      { key: 'angular', text: 'Angular', value: 'angular' },
      { key: 'backbone', text: 'Backbone', value: 'backbone' },
      { key: 'c', text: 'C/C++', value: 'c' },
      { key: 'express', text: 'ExpressJS', value: 'express' },
      { key: 'go', text: 'Go', value: 'go' },
      { key: 'java', text: 'Java', value: 'java' },
      { key: 'javascript', text: 'Javascript', value: 'javascript' },
      { key: 'mongo', text: 'mongoDB', value: 'mongo' },
      { key: 'mysql', text: 'MySQL', value: 'mysql' },
      { key: 'node', text: 'NodeJS', value: 'node' },
      { key: 'python', text: 'Python', value: 'python' },
      { key: 'rails', text: 'Rails', value: 'rails' },
      { key: 'react', text: 'React', value: 'react' },
      { key: 'ruby', text: 'Ruby', value: 'ruby' },
      { key: 'vue', text: 'Vue', value: 'vue' },
    ];

    return (
      <div>
        <Header as='h3' icon textAlign='center' id='createProjectHeader'>
          <Icon name='code' size='small' />
          Add A Project
          <Header.Subheader>
            Provide details about your project so it can be discovered!
          </Header.Subheader>
        </Header>
        <Grid columns='equal'>
          <Grid.Column></Grid.Column>
          <Grid.Column width={6}>
            <Form className='addProject' onSubmit={this.handleSubmit}>
              <Form.Input label='Name' placeholder='Project Name' name='Project Name' value={projectName} onChange={this.handleProjectName} />
              <Form.TextArea label='Description' placeholder='Tell us more about your project...' value={description} onChange={this.handleDescription} />
              <Form.Input label='Github' placeholder='Project repo link' name='Github Repo' value={githubRepo} onChange={this.handleGitHubRepo} />
              <label>Tech Stack</label>
              <Dropdown placeholder='Select' fluid multiple selection options={techOptions} value={techs} id='techDropdown' onChange={this.handleTechs}/>
              <p></p>
              <Form.Input label='Project Screenshot' type='file' value={screenshot} icon={<Icon name='upload'/>} className='inputFile' />
              <Form.Button content='Submit' floated='right' />
            </Form>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
      </div>
    );
  }
}


export default AddProject;
