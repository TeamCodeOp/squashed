import React from 'react';
import { Input } from 'semantic-ui-react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Input
          icon="search"
          placeholder="Search..."
          style={{
            width: '500px',
          }}
        />
      </div>
    );
  }
}

export default Search;
