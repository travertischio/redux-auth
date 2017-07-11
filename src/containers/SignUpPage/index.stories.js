import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@kadira/storybook';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SignUpPage from './';
import { selectIsAuthenticated } from '../../';

let SignUpPageWrapper = (props) => {
  const { isAuthenticated } = props;

  return (
    <main>
      {!isAuthenticated && <SignUpPage />}
      {isAuthenticated && <h1>You are authenticated!</h1>}
    </main>
  );
};

SignUpPageWrapper.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

SignUpPageWrapper = connect(mapStateToProps)(SignUpPageWrapper);

storiesOf('Sign Up Page', module)
  .add('Sign Up', () => <SignUpPageWrapper />);
