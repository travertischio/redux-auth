import React from 'react';
import { shallow } from 'enzyme';

import FormError from '../index';

describe('<FormError />', () => {
  it('should render error text when error and touched are truthy', () => {
    const error = 'An error occurs.';
    const touched = true;
    const renderedComponent = shallow(
      <FormError error={error} touched={touched} />
    );
    expect(renderedComponent.contains(error)).toBe(true);
  });

  it('should not render error text when error message is falsy', () => {
    const error = '';
    const touched = true;
    const renderedComponent = shallow(
      <FormError error={error} touched={touched} />
    );
    expect(renderedComponent.html()).toBeNull();
  });

  it('should not render error text when error and touched is falsy', () => {
    const error = 'An error occurs.';
    const touched = false;
    const renderedComponent = shallow(
      <FormError error={error} touched={touched} />
    );
    expect(renderedComponent.html()).toBeNull();
  });
});
