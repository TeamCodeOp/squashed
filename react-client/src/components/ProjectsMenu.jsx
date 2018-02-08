import React from 'react';
import { Menu } from 'semantic-ui-react';
import TechsFilter from './TechsFilter.jsx';

class ProjectsMenu extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div style={{ textAlign: 'center', marginTop: '5em', marginBottom: '1em' }}>
      <Menu compact className="projectMenu">
        <Menu.Item className="projectMenuItem" onClick={this.props.handleGetLatest}>
          Latest
        </Menu.Item>
        <Menu.Item className="projectMenuItem" onClick={this.props.filterByViews}>
          Popular
        </Menu.Item>
      </Menu>
      </div>
    );
  }
}

export default ProjectsMenu;
