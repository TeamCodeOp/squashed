import React from 'react';

import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import App from '../../react-client/src/components/App.jsx';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

describe('<App />', () => {

  const props = {
    checkSignIn: () => {},
    getProjects: () => {},
    getGithubRepos: () => {}
  };

  it('renders without exploding', () => {
    expect(
      shallow(
        <App {...props} />
      ).length
    ).to.equal(1);
  });

  it('calls componentDidMount', () => {
    spy(App.prototype, 'componentDidMount');
    const wrapper = shallow(<App {...props} />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
    wrapper.unmount();
  });

  it('renders Search', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('Search')).to.have.length(1);
  });

  it('renders ProjectsMenu', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('ProjectsMenu')).to.have.length(1);
  });

  it('renders TechsFilter', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('TechsFilter')).to.have.length(1);
  });

  it('renders NewProjects', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('NewProjects')).to.have.length(1);
  });

  it('renders RepoList', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('RepoList')).to.have.length(1);
  });
});
