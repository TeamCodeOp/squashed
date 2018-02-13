import React, { Component } from 'react';
import { Checkbox, Menu } from 'semantic-ui-react';


const TechMenuItem = ({ tech, handleItemClick }) => (
  <Menu.Item >
    <Checkbox
      onClick={handleItemClick}
      label={tech}
      value={tech}
    />
  </Menu.Item>
);

export default TechMenuItem;

