import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';
import List from './List.jsx';

const MainViewNewProjects = props => (
  <Container style={{ textAlign: 'center' }}>
    <Grid>
      {props.projects.map((project, i) => {
        if (i % 4 === 0 && i <= props.projects.length - 1) {
          return (
            <List
              key={project.id}
              projects={props.projects.slice(i, i + 4)}
              isViewFilter={props.isViewFilter}
              toggleViewFilter={props.toggleViewFilter}
              techFilter={props.techFilter}
            />);
        }
      })}
    </Grid>
  </Container>
);
export default MainViewNewProjects;
