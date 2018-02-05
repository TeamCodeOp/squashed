import { JSDOM } from 'jsdom';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import Project from '../../react-client/src/components/Project.jsx';

xdescribe('<Project />', () => {
  const props = {
    match: {
      params: ''
    }
  };

  xit('renders without exploding', () => {
    expect(
      shallow(
        <Project {...props} />
      ).length
    ).to.equal(1);
  });
});
