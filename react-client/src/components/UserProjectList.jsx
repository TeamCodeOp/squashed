import React from 'react';
import { Grid, Image, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class List extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Grid.Row columns={3}>
        {this.props.items.map((item, i) => {
          return (
            <Grid.Column key={i}>
              <div style={{ float: 'left', position: 'relative' }}>
                <Link to={`/apps/${item.id}`}>
                  <Card style={{ maxWidth: '250px' }}>
                  <Image
                    className='imgThumb'
                    src={item.image_Url || 'https://avatars0.githubusercontent.com/u/583231?s=460&v=4'}
                    style={{
                      borderRadius: '10px',
                      margin: 'auto'
                    }}
                  />
                  <Card.Content>
                    <Card.Header style={{ fontSize: '1em' }}>
                      {item.project_name}
                    </Card.Header>
                    <Card.Description style={{ fontSize: '.85em' }}>
                      {item.category}
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
