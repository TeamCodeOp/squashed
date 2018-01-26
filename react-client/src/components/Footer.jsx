import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';



const Footer = () => (
  <Menu
    inverted
    color="green"
    borderless
    style={{
      flexShrink: 0, //don't allow flexbox to shrink it
      borderRadius: 0, //clear semantic-ui style
      margin: 0, //clear semantic-ui style
      textAlign: 'center'
    }}>
    <Menu.Item header>
      CodeOp &copy; Copyright 2017
    </Menu.Item>
  </Menu>
);


export default Footer;
