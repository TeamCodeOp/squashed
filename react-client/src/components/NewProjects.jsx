import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';
import List from './List.jsx';

class NewProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
  }

  // get request to server/database to fetch repos

  render() {
    return (
      <Container style={{ textAlign: 'center' }}>
        <Grid>
          {this.state.items.map((item, i) => {
            if (i % 4 === 0 && i < this.state.items.length - 1) {
              return <List items={this.state.items.slice(i, i + 4)} />;
            }
          })}
        </Grid>
      </Container>
    )
  }
}

export default NewProjects;
