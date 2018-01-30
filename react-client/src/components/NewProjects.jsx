import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';
import List from './List.jsx';

// class NewProjects extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       projects: []
//     };
//   }

//   // get request to server/database to fetch repos

//   render() {
//     return (
//       <Container style={{ textAlign: 'center' }}>
//         <Grid>
//           {this.props.projects.map((project, i) => {
//             if (i % 4 === 0 && i < this.props.projects.length - 1) {
//               return <List projects={this.props.projects.slice(i, i + 4)} />;
//             }
//           })}
//         </Grid>
//       </Container>
//     );
//   }
// }

const NewProjects = props => (
  <Container style={{ textAlign: 'center' }}>
    <Grid>
      {props.projects.map((project, i) => {
        if (i % 4 === 0 && i < props.projects.length - 1) {
          return <List projects={props.projects.slice(i, i + 4)} />;
        }
      })}
    </Grid>
  </Container>
);
export default NewProjects;
