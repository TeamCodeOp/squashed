import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class TechsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      techs: []
    };

    this.handleTechs = this.handleTechs.bind(this);
  }

  // handleCategorySelect(e, data) {
  //   console.log(data);
  //   this.props.handleCategoryClick(data.value);
  // }

  handleTechs(e, data) {
    console.log(data);
    this.setState({ techs: data.value });
  }

  render() {
    const techs = this.state.techs;
    const techOptions = [
      { key: 'angular', text: 'Angular', value: 'angular' },
      { key: 'backbone', text: 'Backbone', value: 'backbone' },
      { key: 'c', text: 'C/C++', value: 'c' },
      { key: 'express', text: 'ExpressJS', value: 'express' },
      { key: 'go', text: 'Go', value: 'go' },
      { key: 'java', text: 'Java', value: 'java' },
      { key: 'javascript', text: 'Javascript', value: 'javascript' },
      { key: 'mongo', text: 'mongoDB', value: 'mongo' },
      { key: 'mysql', text: 'MySQL', value: 'mysql' },
      { key: 'node', text: 'NodeJS', value: 'node' },
      { key: 'python', text: 'Python', value: 'python' },
      { key: 'rails', text: 'Rails', value: 'rails' },
      { key: 'react', text: 'React', value: 'react' },
      { key: 'ruby', text: 'Ruby', value: 'ruby' },
      { key: 'vue', text: 'Vue', value: 'vue' },
    ];

    return (
      <Dropdown
        placeholder="Techs"
        fluid
        multiple
        selection
        options={techOptions}
        value={techs}
        id="techDropdown"
        onChange={this.handleTechs}
      />
    );
  }
}

export default TechsFilter;
