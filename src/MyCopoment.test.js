import React from 'react';
import { shallow } from 'enzyme';

import MyComponent from './MyComponent';

describe('<MyComponent />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MyComponent />);
  });

  it('renders div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
