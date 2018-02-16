import React from 'react';
import { Header, Menu, Icon, Form, Input, Grid, Dropdown } from 'semantic-ui-react';

const PleaseLogIn = (props) => {
  if (props.shouldRedirectProject) {
    document.cookie = 'INTERCEPTED_ROUTE=/create';
  }
  if (props.shouldRedirectBrainstorm) {
    document.cookie = 'INTERCEPTED_ROUTE=/ideas';
  }

  return (
    <div>
      <Grid columns="equal">
        <Grid.Column />
        <Grid.Column width={6}>
          <h2 id="pleaseLogIn" className="ui container center aligned">
            <i className="fab fa-github" />
          </h2>
          <div className="ui container center aligned">
            <a href="/auth/github" style={{ color: 'rgba(0,0,0,.6)' }}>Please login using Github</a>
          </div>
        </Grid.Column>
        <Grid.Column />
      </Grid>
    </div>
  );
};

export default PleaseLogIn;
