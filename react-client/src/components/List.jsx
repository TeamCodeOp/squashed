import React from 'react';
import { Grid, Image, Icon, Card } from 'semantic-ui-react';
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
                <Card style={{ maxWidth: '230px' }}>
                  <Image
                    className='imgThumb'
                    src={project.image_Url || 'https://avatars0.githubusercontent.com/u/583231?s=460&v=4'}
                    style={{
                      borderRadius: '0px',
                      margin: 'auto'
                    }}
                  />
                  <Card.Content>
                    <Card.Header style={{ fontSize: '1em' }}>
                      {project.project_name}
                    </Card.Header>
                    <Card.Description style={{ fontSize: '.85em' }}>
                      {project.category}
                    </Card.Description>
                  </Card.Content>
                </Card>
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