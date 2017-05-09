import React, { PureComponent } from 'react';
import { shallow } from 'enzyme';
import compose from 'recompose/compose';
import { AuthenticationContext } from './hocs';

describe('AuthenticationContext', () => {
  class TestComponent extends PureComponent {} // eslint-disable-line react/prefer-stateless-function
  let TestComponentWithAuthContext;

  beforeEach(() => {
    TestComponentWithAuthContext = compose(AuthenticationContext)(TestComponent);
  });

  it('should component have isAuthenticated property with true value', () => {
    const renderedComponent = shallow(<TestComponentWithAuthContext />, {
      context: { isAuthenticated: true },
    });
    expect(renderedComponent.props().isAuthenticated).toEqual(true);
  });
});

