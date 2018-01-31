import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

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
                <a href={'https://github.com/TeamCodeOp/thesis'}>
                  <Image src={'https://avatars0.githubusercontent.com/u/583231?s=460&v=4'} style={{ borderRadius: '10px' }} />
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
                      {item.name} {'\n'}
                      <p />
                      <p>{item.description}</p>
                      <p>Techs: {'JavaScript'}{' '}</p>
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