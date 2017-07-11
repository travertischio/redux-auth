/*
 *
 * SignUpPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import createSignUpContainer from './create-container';
import SignUpForm from '../../components/SignUpForm';

function SignUpPage(props) {
  const {
    onSubmitForm,
    SignUpPage: {
      loading,
      errorMessage,
    },
  } = props;

  return (
    <div>
      { loading && <div>Processing... Please wait.</div> }
      { errorMessage && <div>{errorMessage}</div> }

      <SignUpForm onSubmit={onSubmitForm} />
    </div>
  );
}

SignUpPage.propTypes = {
  SignUpPage: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

export default createSignUpContainer(SignUpPage);
