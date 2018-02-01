import React from 'react';
import { Input, Header } from 'semantic-ui-react';
import $ from 'jquery';
import _ from 'underscore';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchProject: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.debounceFunc = _.debounce(this.handleSearchBar, 500);
    this.handleSearchBar = this.handleSearchBar.bind(this);
  }
  handleChange(e) {
    console.log('changed value', e.target.value);
    this.setState({
      searchProject: e.target.value
    });
    this.debounceFunc();
  }

  handleSearchBar() {
    const that = this;
    $.ajax({
      url: `/searchProjects?title=${that.state.searchProject}`,
      success: (response) => {
        console.log('RESPONSE IN SearchBar', response);
        that.props.searchByUserInput(response);
      },
      error: () => {
        console.log('check access token error');
      }
    });
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
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Search;
