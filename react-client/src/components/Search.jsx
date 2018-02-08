import React from 'react';
import { Input, Header } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'underscore';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button } from 'semantic-ui-react';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchProject: '',
      projects: [],
      selectedProject: '',
      flag: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.debounceFunc = _.debounce(this.handleSearchBar, 500);
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchProject: e
    });

    this.debounceFunc();
  }

  handleSearchBar() {
    axios.get(`/searchProjects?title=${this.state.searchProject}`)
    .then((response) => {
      this.setState({
        projects: response.data
      });
    })
    .catch((error) => {
      console.log('check access token error');
    });
  }

  handleSearch() {
    this.props.searchByUserInput(this.state.selectedProject);
  }

  render() {

    return (
      <div id='searchInput'>
      <Typeahead
        options={this.state.projects}
        multiple={false}
        onInputChange={this.handleChange}
        onChange={(selected) => {
           this.setState({
            selectedProject: selected
           });
         }}
        labelKey={option=> `${option.project_name}`}
      />
      <Button onClick={this.handleSearch} style={{marginLeft: '2px', lineHeight: '.9em'}}>Search</Button>

      </div>
    );
  }
}

export default Search;