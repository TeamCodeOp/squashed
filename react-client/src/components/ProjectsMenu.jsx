import React from 'react';
import { Menu } from 'semantic-ui-react';
import TechsFilter from './TechsFilter.jsx';

class ProjectsMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Menu className="projectMenu">
        <Menu.Item className="projectMenuItem" onClick={this.props.handleGetLatest}>
          Latest
        </Menu.Item>
        <Menu.Item className="projectMenuItem" onClick={this.props.getProjects}>
          Popular
        </Menu.Item>
      </Menu>
    );
  }
}

export default ProjectsMenu;
