import React, { Component } from 'react';
import { Input, Label, Menu, Checkbox } from 'semantic-ui-react';
import _ from 'underscore';
import TechMenuItem from './TechMenuItem.jsx';
import techOptions from '../techOptions';

class SideTechFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { techs: [] };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, data) {
    let copy;
    const index = _.indexOf(this.state.techs, data.value);
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
