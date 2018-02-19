import React from 'react';
import { createComponentWithIntl } from 'react-unit-testing-utils';
import BlockedAccount from './';

describe('<BlockedAccount />', () => {
  it('should render BlockedAccount', () => {
    const initialState = {};
    const { component } = createComponentWithIntl(<BlockedAccount />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
