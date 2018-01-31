import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

class List extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Grid.Row columns={4}>
        {this.props.projects.map((project, i) => {
          //Remember that every row constitues a new List component because the results mapping is initiated in index.jsx
          //so all this map does is create new Columns for containing div for each item in the Semantic-UI Grid

          return (
            <Grid.Column key={i}>
              <div style={{ float: 'left', position: 'relative' }}>
                <a href={project.repo_url}>
                  <Image
                    src={project.image_Url || 'https://avatars0.githubusercontent.com/u/583231?s=460&v=4'}
                    style={{
                      borderRadius: '10px',
                      height: '180px',
                      width: '100%'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: '0px',
                      width: '100%',
                      backgroundColor: 'black',
                      color: 'white',
                      opacity: '0.6',
                      filter: 'alpha(opacity=60)'
                    }}
                  >
                    <p
                      style={{
                        filter: 'alpha(opacity=50)',
                        padding: '10px',
                        margin: '0px',
                        textAlign: 'left'
                      }}
                    >
                      {project.project_name} {'\n'}
                      <p></p>
                      <p>{project.description}</p>
                      <p>
                      Techs: {project.category}{' '}
                      </p>

                    </p>
                  </div>
                </a>
              </div>
            </Grid.Column>
          );
        })}
      </Grid.Row>
    );
  }
}

export default List;
