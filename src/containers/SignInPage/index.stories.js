import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@kadira/storybook';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SignInPage from './';
import { selectIsAuthenticated } from '../../';

let SignInPageWrapper = (props) => {
  const { isAuthenticated } = props;

  return (
    <main>
      {!isAuthenticated && <SignInPage />}
      {isAuthenticated && <h1>You are authenticated!</h1>}
    </main>
  );
};

SignInPageWrapper.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

SignInPageWrapper = connect(mapStateToProps)(SignInPageWrapper);

storiesOf('Sign In Page', module)
  .add('Sign In Page', () => <SignInPageWrapper />);
