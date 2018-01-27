import React from 'react';
import { Header, Icon, Form, Input, Grid, Dropdown } from 'semantic-ui-react';

class AddProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      description: '',
      githubRepo: ''
    };
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const { projectName, description, githubRepo } = this.state;

    this.setState({
      projectName: projectName,
      description: description,
      githubRepo: githubRepo
    });
  }


  render() {
    const { projectName, description, githubRepo } = this.state;
    const techs = [
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
              <Form.Input label='Project Name' placeholder='Project Name' name='Project Name' value={projectName} onChange={this.handleChange} />
              <Form.TextArea label='Description' placeholder='Tell us more about your project...' />
              <Form.Input label='Github' placeholder='Repo Link' name='Github Repo' value={githubRepo} onChange={this.handleChange} />
              <label>Tech Stacks</label>
              <Dropdown placeholder='Techs' fluid multiple selection options={techs} id='techDropdown' />
              <p></p>
              <Form.Input label='Project Screenshot' type='file' icon={<Icon name='upload'/>} className='inputFile' />
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
