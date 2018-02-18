import { JSDOM } from 'jsdom';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import Search from '../../react-client/src/components/Search.jsx';

describe('<Search />', () => {
  it('Search should exist', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.exists()).to.equal(true);
  });
});
