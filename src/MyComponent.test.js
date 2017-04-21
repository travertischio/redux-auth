import React from 'react';
import { shallow } from 'enzyme';

import MyComponent from './MyComponent';

describe('<MyComponent />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MyComponent text="TEXT" />);
  });

  it('renders div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render TEXT in p', () => {
    expect(wrapper.find('p').text()).toBe('TEXT');
  });

  it('should render DEFAULT_TEXT in p', () => {
    wrapper = shallow(<MyComponent />);
    expect(wrapper.find('p').text()).toBe('DEFAULT_TEXT');
  });
});
