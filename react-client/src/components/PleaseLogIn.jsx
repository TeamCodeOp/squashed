import React from 'react';
import { Header, Menu, Icon, Form, Input, Grid, Dropdown } from 'semantic-ui-react';

const PleaseLogIn = () => {
  return (
    <div>
      <Grid columns='equal'>
        <Grid.Column></Grid.Column>
          <Grid.Column width={6}>

            <h3 id="login-h3"><i className="fab fa-github"></i></h3>

            <div className="ui container center aligned">
              <a href="/auth/github" style={{ color: "rgba(0,0,0,.6)" }}>Please login using Github</a>
            </div>

          </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </div>
  );
};

export default PleaseLogIn;
