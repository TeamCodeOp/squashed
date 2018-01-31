import React from 'react';
import { Header, Menu, Icon, Form, Input, Grid, Dropdown } from 'semantic-ui-react';

const PleaseLogIn = () => {
  return (
    <div>
      <Grid columns='equal'>
        <Grid.Column></Grid.Column>
          <Grid.Column width={6}>

            <h3 id="login-h3">Please login using Github</h3>

            <div className="ui container center aligned">
              <a icon="github" href="/auth/github">Please login using Github</a>
            </div>

          </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </div>
  );
};

export default PleaseLogIn;
