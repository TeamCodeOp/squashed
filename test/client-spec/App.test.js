import { JSDOM } from 'jsdom';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import App from '../../react-client/src/components/App.jsx';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;


describe('<App />', () => {
  it('calls componentDidMount', () => {
    spy(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
    wrapper.unmount();
  });
  it('renders Search', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Search')).to.have.length(1);
  });
  it('renders NewProjects', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('NewProjects')).to.have.length(1);
  });
});
