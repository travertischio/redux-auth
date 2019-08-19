import React from 'react';
import { createComponentWithIntl } from 'react-unit-testing-utils';

import SignInForm from '.';

describe('<SignInForm />', () => {
  it('should render SignInForm', () => {
    const initialState = {};
    const { component } = createComponentWithIntl(<SignInForm />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render SignInForm with captcha when has captchaRequired prop', () => {
    const initialState = {};
    const { component } = createComponentWithIntl(<SignInForm captchaRequired />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
