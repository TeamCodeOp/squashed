import React from 'react';
import { Menu } from 'semantic-ui-react';
import TechsFilter from './TechsFilter.jsx';

class ProjectsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      techs: []
    };
    this.handleTechs = this.handleTechs.bind(this);
    this.handleGetLatest = this.handleGetLatest.bind(this);
  }

  handleTechs(e, data) {
    this.setState({ techs: data.value }, function () {
      this.props.getProjectsByTechs(this.state.techs);
    });
  }

  handleGetLatest() {
    this.setState({
      techs: []
    }, function () {
      this.props.getProjects();
    });
  }

  render() {
    return (
      <Menu className="projectMenu">
        <Menu.Item className="projectMenuItem" onClick={this.handleGetLatest}>
          Latest
        </Menu.Item>
        <Menu.Item className="projectMenuItem">
          <TechsFilter
            getProjectsByTechs={this.props.getProjectsByTechs}
            handleTechs={this.handleTechs}
            techs={this.state.techs}
          />
        </Menu.Item>
        <Menu.Item className="projectMenuItem" onClick={this.props.getProjects}>
          Popular
        </Menu.Item>
      </Menu>
    );
  }
}

export default ProjectsMenu;
