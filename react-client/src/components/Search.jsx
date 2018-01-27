import React from 'react';
import { Input, Header } from 'semantic-ui-react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{
        textAlign: 'center',
        height: "200px"
      }}>
        <Header as='h1' textAlign='center'>
          <Header.Content>
            CodeOp
          </Header.Content>
        </Header>
        <Input
          icon="search"
          placeholder="Search..."
          style={{
            width: '500px',
            marginTop: '50px'
          }}
        />
      </div>
    );
  }
}

export default Search;
