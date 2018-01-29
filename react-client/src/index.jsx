import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import Root from './components/Root.jsx';

let store;


render(
  <Root />,
  document.getElementById('root')
);

