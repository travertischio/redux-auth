import React from 'react';
import { createComponentWithIntl } from 'react-unit-testing-utils';

import ResetPasswordForm from '.';

describe('<ResetPasswordForm />', () => {
  it('should render ResetPasswordForm', () => {
    const initialState = {};
    const { component } = createComponentWithIntl(<ResetPasswordForm />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
