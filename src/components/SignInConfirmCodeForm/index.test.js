import React from 'react';
import { createComponentWithIntl } from 'react-unit-testing-utils';

import SignInConfirmCodeForm from './';

describe('<SignInConfirmCodeForm />', () => {
  it('should render SignInForm', () => {
    const initialState = {};
    const { component } = createComponentWithIntl(<SignInConfirmCodeForm />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
