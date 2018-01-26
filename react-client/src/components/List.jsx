import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //hovering is not currently used but would be a cool UI feature to implement
      //we left the infrastructure below for you to work with :)
      hover: false
    };
  }
  setButtonHovered(bool) {
    //method not currently utilized
    this.state.hover = bool;
    if (this.state.hover === true) {
    }
  }
  render() {
    return (
      <Grid.Row columns={4}>
        {this.props.items.map((item, i) => {
          //Remember that every row constitues a new List component because the results mapping is initiated in index.jsx
          //so all this map does is create new Columns for containing div for each item in the Semantic-UI Grid
          return (
            <Grid.Column
              onMouseEnter={() => this.setButtonHovered(true)}
              onMouseLeave={() => this.setButtonHovered(false)}
            >
              <div style={{ float: 'left', position: 'relative' }}>
                <a href={'https://github.com/TeamCodeOp/thesis'}>
                  <Image src={'https://avatars0.githubusercontent.com/u/583231?s=460&v=4'} style={{ borderRadius: '10px' }} /*set the size of the image*/ />
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
                  /*create a div for the information overlay and style the text. we use nested paragraph tags below to put a space between the recipe Name and Price*/>
                    <p
                      style={{
                        filter: 'alpha(opacity=50)',
                        padding: '10px',
                        margin: '0px',
                        textAlign: 'left'
                      }}
                    >
                      {item.name} {'\n'}
                      <p></p>
                      <p>{item.description}</p>
                      <p>
                      Techs: {'JavaScript'}{' '}
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
