import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../';

export default function withUserData(Component) {
  const ComponentWithUserData = (props) => <Component {...props} />;

  const mapStateToProps = createStructuredSelector({
    authData: selectUser,
  });

  return connect(mapStateToProps)(ComponentWithUserData);
}
