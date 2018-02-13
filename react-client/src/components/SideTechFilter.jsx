import React, { Component } from 'react';
import { Input, Label, Menu, Checkbox } from 'semantic-ui-react';
import TechMenuItem from './TechMenuItem.jsx';
import techOptions from '../techOptions.js';
import _ from 'underscore';

class SideTechFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { techs: [] };
    this.handleItemClick = this.handleItemClick.bind(this);


  }

  handleItemClick(e, data) {
    console.log(data.value);
    let copy;
    const index = _.indexOf(this.state.techs, data.value);
    console.log('index',index);
    if (index === -1) {
      this.setState({ techs: this.state.techs.concat(data.value) }, () => this.props.handleTechs(this.state.techs));
    } else {
      copy = this.state.techs.slice();
      copy.splice(index, 1);
      this.setState({ techs: copy }, () => this.props.handleTechs(this.state.techs));
    }
  }

  render() {
    return (
      <Menu vertical>
        {techOptions.map((tech, i) =>
          (
            <TechMenuItem
              key={i}
              tech={tech.value}
              handleTechs={this.props.handleTechs}
              handleItemClick={this.handleItemClick}
            />
          )
        )}
      </Menu>
    );
  }
}

export default SideTechFilter;