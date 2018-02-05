import React from 'react';
import UploadForm from './UploadForm.jsx';
import PleaseLogIn from './PleaseLogIn.jsx';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

class AddProject extends React.Component {

  constructor(props) {
    super(props);

    this.isLoggedIn = !!this.props.sessionID;
  }

  componentWillReceiveProps(nextProps) {
    console.log('will receive next props: ', nextProps);
    this.isLoggedIn = !!nextProps.sessionId;
  }

  render() {
    console.log('AddProject Props: ',this.props);
    console.log('Logged in?:', this.isLoggedIn);
    if (this.props.isCheckingLogIn) {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      );
    }
    if (this.isLoggedIn) {
      document.cookie = 'INTERCEPTED_ROUTE=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      return <UploadForm props={this.props} />;
    }
    document.cookie = 'INTERCEPTED_ROUTE=/create';
    return <PleaseLogIn />;
  }
}

export default AddProject;
