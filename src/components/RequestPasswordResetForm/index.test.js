import React from 'react';
import { createComponentWithIntl } from 'react-unit-testing-utils';

import RequestPasswordResetForm from '.';

describe('<RequestPasswordResetForm />', () => {
  it('should render RequestPasswordResetForm', () => {
    const initialState = {};
    const { component } = createComponentWithIntl(<RequestPasswordResetForm />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
