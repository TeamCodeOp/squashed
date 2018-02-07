import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import Root from '../../react-client/src/components/Root.jsx';

spy(Root.prototype, 'componentDidMount');

describe('<Root />', () => {

  it('calls componentDidMount', () => {
    const wrapper = shallow(<Root />);
    expect(Root.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('sets the initial state', () => {
    const wrapper = shallow(<Root />);
    expect(wrapper.state().session_id).to.equal('');
    expect(wrapper.state().username).to.equal('');
    expect(wrapper.state().name).to.equal('');
    expect(wrapper.state().projects).to.deep.equal([]);
    expect(wrapper.state().userID).to.equal(undefined);
  });

});
