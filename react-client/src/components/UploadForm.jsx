import React from 'react';
import axios from 'axios';
import cloudinary from 'cloudinary';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Header, Icon, Form, Input, Grid, Dropdown } from 'semantic-ui-react';
import _ from 'underscore';

let config;
let CLOUDINARY_UPLOAD_URL;
let CLOUDINARY_UPLOAD_PRESET;

if (process.env.NODE_ENV === 'production') {
  CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_URL;
  CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
} else if (process.env.NODE_ENV === 'development') {
  config = require('../../../config/configvars.js');
  CLOUDINARY_UPLOAD_URL = config.CLOUDINARY_UPLOAD_URL;
  CLOUDINARY_UPLOAD_PRESET = config.CLOUDINARY_UPLOAD_PRESET;
} else {
  CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_URL;
  CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
}

class UploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      description: '',
      githubRepo: '',
      techs: [],
      uploadedFileCloudinaryUrl: '',
    };

    this.handleTechs = this.handleTechs.bind(this);
    this.handleGitHubRepo = this.handleGitHubRepo.bind(this);
    this.handleProjectName = this.handleProjectName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.shouldRedirectProject) {
      this.props.handleProjectRedirect();
    }
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
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
      uploadedFileCloudinaryUrl: this.state.uploadedFileCloudinaryUrl,
      userId: this.props.userId
    })
      .then((response) => {
        this.setState({
          projectName: '',
          description: '',
          githubRepo: '',
          techs: [],
          uploadedFileCloudinaryUrl: '',
          uploadedFile: ''
        });
        alert('Project added successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //  not using it anywhere, wrote this to send put req to server for edit form
  handleUpdate(e) {
    e.preventDefault();
    axios.put('/projects', {
      projectName: this.state.projectName,
      description: this.state.description,
      githubRepo: this.state.githubRepo,
      techs: this.state.techs,
      uploadedFileCloudinaryUrl: this.state.uploadedFileCloudinaryUrl,
      userId: this.props.userId,
      projectId: this.props.history.location.state.projectId
    })
      .then((response) => {
        alert('Project updated successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleTechs(e, data) {
    this.setState({ techs: data.value });
  }

  render() {
    let techStackArray = [];
    if (this.props.history.location.state) {
      const newTechStack = JSON.parse(this.props.history.location.state.techStack);
      if (this.props.history.location.state) {
        for (let i = 0; i < newTechStack.length; i++) {
          techStackArray.push(newTechStack[i].key);
        }
      }
    }
    document.cookie = 'INTERCEPTED_ROUTE=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
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
        <Header as="h3" icon textAlign="center" id="createProjectHeader">
          <Icon name="code" size="small" />
          Add A Project
          <Header.Subheader>
            Provide details about your project so it can be discovered!
          </Header.Subheader>
        </Header>
        <Grid columns="equal">
          <Grid.Column />
          <Grid.Column width={6}>
            <Form className="addProject" onSubmit={this.handleSubmit}>
              <Form.Input
                label="Name"
                placeholder="Project Name"
                name="Project Name"
                value={this.props.history.location.state ? "hello" : projectName}
                onChange={this.handleProjectName}
              />
              <Form.Input
                label="Github"
                placeholder="Project repo link"
                name="Github Repo"
                value={this.props.history.location.state ? this.props.history.location.state.githubUrl: githubRepo}
                onChange={this.handleGitHubRepo}
              />
              <label style={{fontWeight: 'bold', marginBottom: '-2px'}}>Tech Stack</label>
              <Dropdown
                placeholder="Select"
                fluid
                multiple
                selection
                options={techOptions}
                value={this.props.history.location.state ? techStackArray : techs}
                id="techDropdown"
                onChange={this.handleTechs}
              />
              <p />
              <Form.TextArea
                label="Description"
                placeholder="Tell us more about your project..."
                value={this.props.history.location.state ? this.props.history.location.state.description : description}
                onChange={this.handleDescription}
              />
              <label>Project Screenshot</label>
              <div className="fileUpload">
                <Dropzone
                  className="dropZone"
                  onDrop={this.onImageDrop.bind(this)}
                  multiple={false}
                  accept="image/*"
                >
                  <span className="imageUploadText">
                    <Icon
                      name="upload"
                      size="large"
                    />Drop an image or click to select a file to upload.
                  </span>
                </Dropzone>
              </div>

              <div>
                {this.state.uploadedFileCloudinaryUrl === '' ? null :
                  <div style={{textAlign: 'center'}}>
                    <p>{this.state.uploadedFile.name}</p>
                    <img src={this.state.uploadedFileCloudinaryUrl} style={{ height: '125px' }} />
                  </div>}
              </div>
              {this.props.history.location.state ? <Form.Button content="Update" floated="right" /> : <Form.Button content="Submit" floated="right" />}
            </Form>
          </Grid.Column>
          <Grid.Column />
        </Grid>
      </div>
    );
  }
}

export default UploadForm;
