import { JSDOM } from 'jsdom';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import NewProjects from '../../react-client/src/components/NewProjects.jsx';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

xdescribe('<NewProjects />', () => {
  it('calls componentDidMount', () => {
    spy(NewProjects.prototype, 'componentDidMount');
    const wrapper = mount(<NewProjects />);
    expect(NewProjects.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
