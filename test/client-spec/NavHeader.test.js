import { JSDOM } from 'jsdom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import NavHeader from '../../react-client/src/components/NavHeader.jsx';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

describe('<NavHeader />', () => {
  it('should contain 4 Menu Items. Add here', () => {
    const wrapper = mount(
      <MemoryRouter>
        <NavHeader />
      </MemoryRouter>);
    expect(wrapper.find('MenuItem')).to.have.length(4);
    wrapper.unmount();
  });

  it('should contain Home item', () => {
    const wrapper = mount(
      <MemoryRouter>
        <NavHeader />
      </MemoryRouter>
    );
    expect(wrapper.find('MenuItem').find({ name: 'Home' })).to.have.length(1);
  });
});
