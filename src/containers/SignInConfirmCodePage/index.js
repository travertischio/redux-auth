/*
 *
 * SignInConfirmCodePage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form/immutable';
import SignInConfirmCodeForm from '~/components/SignInConfirmCodeForm';
import createSignInConfirmCodeContainer from './create-container';

function SignInConfirmCodePage(props) {
  const handleSubmit = (values) => props
    .onSubmitForm(values)
    .catch((error) => {
      throw new SubmissionError(error.response && error.response.data);
    });

  return (
    <SignInConfirmCodeForm onSubmit={handleSubmit} />
  );
}

SignInConfirmCodePage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default createSignInConfirmCodeContainer(SignInConfirmCodePage);
