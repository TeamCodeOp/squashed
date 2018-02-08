import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';
import List from './List.jsx';

const NewProjects = props => (
  <Container style={{ textAlign: 'center' }}>
    <Grid>
      {props.projects.map((project, i) => {
        if (i % 4 === 0 && i <= props.projects.length - 1) {
          return (
            <List
              key={i}
              projects={props.projects.slice(i, i + 4)}
              isViewFilter={props.isViewFilter}
              toggleViewFilter={props.toggleViewFilter}
            />);
        }
      })}
    </Grid>
  </Container>
);
export default NewProjects;
