import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@kadira/storybook';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SignOutPage from './';
import { selectIsAuthenticated } from '../../';

let SignOutPageWrapper = (props) => {
  const { isAuthenticated } = props;

  return (
    <main>
      {isAuthenticated && <SignOutPage />}
      {!isAuthenticated && <h1>You are not authenticated!</h1>}
    </main>
  );
};

SignOutPageWrapper.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

SignOutPageWrapper = connect(mapStateToProps)(SignOutPageWrapper);

storiesOf('Sign Out Page', module)
  .add('Sign Out', () => <SignOutPageWrapper />);
