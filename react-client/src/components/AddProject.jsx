import React from 'react';

import UploadForm from './UploadForm.jsx';
import PleaseLogIn from './PleaseLogIn.jsx';

class AddProject extends React.Component {

  constructor(props) {
    super(props);

    this.isLoggedIn = false;
    if (this.props.sessionId) {
      this.isLoggedIn = true;
    }
  }

  render() {
    if (this.isLoggedIn) {
      return <UploadForm props={this.props} />;
    }
    return <PleaseLogIn />;
  }
}

export default AddProject;