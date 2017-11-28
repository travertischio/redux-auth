import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectIsAuthenticated,
  selectUser,
} from '../../containers/AuthenticationProvider/selectors';

export default function withUserData(WrappedComponent) {
  const ComponentWithUserData = (props) => <WrappedComponent {...props} />;

  const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
    userData: selectUser,
  });

  return connect(mapStateToProps)(ComponentWithUserData);
}
