import React from 'react';
import { Grid, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class List extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <Grid.Row columns={4}>
        {this.props.projects.map((project, i) => {
          return (
            <Grid.Column key={i}>
              <div style={{ float: 'left', position: 'relative' }}>
                <Link to={`/apps/${project.id}`}>
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
                      {project.project_name}
                      <p></p>
                      Techs: {project.category}{' '}
                      </p>
                  </div>
                </Link>
              </div>
            </Grid.Column>
          );
        })}
      </Grid.Row>
    );
  }
}

export default List;