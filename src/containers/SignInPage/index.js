/*
 *
 * SignInPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import createSignInContainer from './create-container';
import SignInForm from '../../components/SignInForm';

function SignInPage(props) {
  const {
    onSubmitForm,
    SignInPage: {
      loading,
      errorMessage,
    },
  } = props;

  return (
    <div>
      { loading && <div>Processing... Please wait.</div> }
      { errorMessage && <div>{errorMessage}</div> }

      <SignInForm onSubmit={onSubmitForm} />
    </div>
  );
}

SignInPage.propTypes = {
  SignInPage: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

export default createSignInContainer(SignInPage);
