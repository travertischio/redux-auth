/*
 *
 * SignInConfirmCodePage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import createSignInConfirmCodeContainer from './create-container';
import SignInConfirmCodeForm from '../../components/SignInConfirmCodeForm';

function SignInConfirmCodePage(props) {
  const {
    onSubmitForm,
    SignInConfirmCodePage: {
      loading,
      errorMessage,
    },
  } = props;

  return (
    <div>
      { loading && <div>Processing... Please wait.</div> }
      { errorMessage && <div>{errorMessage}</div> }

      <SignInConfirmCodeForm onSubmit={onSubmitForm} />
    </div>
  );
}

SignInConfirmCodePage.propTypes = {
  SignInConfirmCodePage: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

export default createSignInConfirmCodeContainer(SignInConfirmCodePage);
