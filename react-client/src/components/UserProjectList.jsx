import React from 'react';
import { Grid, Image, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const List = (props) => {
  return (
    <Grid.Row columns={3}>
      {props.items.map((item, i) => {
        return (
          <Grid.Column key={i}>
            <div>
              <Link to={`/apps/${item.id}`}>
                <Card>
                  <Image
                    className="imgThumb"
                    src={item.image_Url || 'https://avatars0.githubusercontent.com/u/583231?s=460&v=4'}
                   />
                  <Card.Content>
                    <Card.Header>
                      {item.project_name}
                    </Card.Header>
                    <Card.Description>
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
};

export default List;
