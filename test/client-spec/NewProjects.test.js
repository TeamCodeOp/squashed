import React from 'react';

import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import NewProjects from '../../react-client/src/components/NewProjects.jsx';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

describe('<NewProjects />', () => {

  const props = {
    projects: []
  };

  it('renders without exploding', () => {
    expect(
      shallow(
        <NewProjects {...props}/>
      ).length
    ).to.equal(1);
  });

});
