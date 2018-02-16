import React from 'react';
import axios from 'axios';
import cloudinary from 'cloudinary';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Header, Icon, Form, Input, Grid, Dropdown, Message } from 'semantic-ui-react';
import _ from 'underscore';
import techOptions from '../techOptions';
import errorCodes from '../errorCodes';

let config;
let CLOUDINARY_UPLOAD_URL;
let CLOUDINARY_UPLOAD_PRESET;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_URL;
  CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
} else {
  config = require('../../../config/configvars.js');
  CLOUDINARY_UPLOAD_URL = config.CLOUDINARY_UPLOAD_URL;
  CLOUDINARY_UPLOAD_PRESET = config.CLOUDINARY_UPLOAD_PRESET;
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
      isProjectNameError: false,
      isGithubUrlError: false,
      isPosted: false,
      isPostError: false,
      displayError: ''
    };

    this.handleTechs = this.handleTechs.bind(this);
    this.handleGitHubRepo = this.handleGitHubRepo.bind(this);
    this.handleProjectName = this.handleProjectName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  componentWillMount() {
    const techStackArray = [];
    if (this.props.history.location.state) {
      const newTechStack = JSON.parse(this.props.history.location.state.techStack);
      if (this.props.history.location.state) {
        for (let i = 0; i < newTechStack.length; i += 1) {
          techStackArray.push(newTechStack[i].key);
        }
      }
    }
    if (this.props.history.location.state) {
      this.setState({
        projectName: this.props.history.location.state.projectName,
        description: this.props.history.location.state.description,
        githubRepo: this.props.history.location.state.githubUrl,
        techs: techStackArray
      });
    }
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
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
          isPosted: false
        });
      }
    });
  }

  handleProjectName(e) {
    this.setState({
      projectName: e.target.value,
      isPosted: false
    });
  }

  handleGitHubRepo(e) {
    this.setState({
      githubRepo: e.target.value,
      isPosted: false
    });
  }

  handleDescription(e) {
    this.setState({
      description: e.target.value,
      isPosted: false
    });
  }

  handleSubmit() {
    const isError = this.state.isProjectNameError || this.state.isGithubUrlError;
    let projectToBeAdded = this.state.projectName;
    if (isError) {
      this.setState({ displayError: 'Please fill in all required fields', isPostError: true });
    } else {
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
            uploadedFile: '',
            isPosted: true
          }, () => {
            axios.post('/notifications', {
              projectName: projectToBeAdded,
              userId: this.props.userId,
            })
              .then((response) => {
                console.log('Notifications schema added successfully');
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          const code = error.response.data.code;
          const errorMessage = error.response.data.sqlMessage;
          const displayError = errorCodes[code] || 'Please try again.';
          const isProjectNameError = errorMessage.includes(`key 'project_name'`);
          const isGithubUrlError = errorMessage.includes(`key 'repo_url'`);
          this.setState({
            isPostError: true,
            displayError,
            isProjectNameError,
            isGithubUrlError
          });
        });
    }
  }

  handleUpdate() {
    const isError = this.state.isProjectNameError || this.state.isGithubUrlError;
    if (isError) {
      this.setState({ displayError: 'Please fill in all required fields', isPostError: true });
    } else {
      axios.put('/projects', {
        projectName: this.state.projectName,
        description: this.state.description,
        githubRepo: this.state.githubRepo,
        techs: this.state.techs,
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
  }

  handleTechs(e, data) {
    this.setState({ techs: data.value, isPosted: false });
  }

  validateFields(e) {
    e.preventDefault();
    console.log('validatingFields');
    const isProjectNameError = this.state.projectName === '';
    const isGithubUrlError = this.state.githubRepo === '';

    this.setState({
      isProjectNameError,
      isGithubUrlError,
      isPostError: false,
      isPosted: false
    }, () => {
      if (this.props.history.location.state) {
        this.handleUpdate();
      } else {
        this.handleSubmit();
      }
    });
  }

  render() {
    const {
      projectName, description, githubRepo, techs, screenshot
    } = this.state;
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
            <Form className="addProject" success={this.state.isPosted} error={this.state.isPostError}>
              <Message
                success
                header="Submitted!"
                content="Your project has been posted."
              />
              <Message
                error
                header="Error!"
                content={this.state.displayError}
              />
              <Form.Input
                label="Name"
                placeholder="Project Name"
                name="Project Name"
                value={this.state.projectName}
                onChange={this.handleProjectName}
                required
                error={this.state.isProjectNameError}
              />
              <Form.Input
                label="Github"
                placeholder="Project repo link"
                name="Github Repo"
                value={this.state.githubRepo}
                onChange={this.handleGitHubRepo}
                required
                error={this.state.isGithubUrlError}
              />
              <Form.Input
                label="Tech Stack"
                style={{ fontWeight: 'bold', marginBottom: '-2px' }}
              >
                <Dropdown
                  placeholder="Select"
                  fluid
                  multiple
                  selection
                  options={techOptions}
                  value={this.state.techs}
                  id="techDropdown"
                  onChange={this.handleTechs}
                />
              </Form.Input>

              <Form.TextArea
                label="Description"
                placeholder="Tell us more about your project..."
                value={this.state.description}
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
                <div style={{ textAlign: 'center' }}>
                  <p>{this.state.uploadedFile.name}</p>
                  <img src={this.state.uploadedFileCloudinaryUrl} style={{ height: '125px' }} />
                </div>}
              </div>
              {this.props.history.location.state ? <Form.Button content="Update" floated="right" onClick={this.validateFields} /> : <Form.Button content="Submit" floated="right" onClick={this.validateFields} />}
            </Form>
          </Grid.Column>
          <Grid.Column />
        </Grid>
      </div>
    );
  }
}

export default UploadForm;
