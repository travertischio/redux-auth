import React from 'react';
import { createComponentWithIntl } from 'react-unit-testing-utils';

import SignInForm from './';

describe('<SignInForm />', () => {
  it('should render SignInForm', () => {
    const initialState = {};
    const { component } = createComponentWithIntl(<SignInForm />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
