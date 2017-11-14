/*
 *
 * SignInConfirmCodePage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form/immutable';
import createSignInConfirmCodeContainer from './create-container';
import SignInConfirmCodeForm from '../../components/SignInConfirmCodeForm';

function SignInConfirmCodePage(props) {
  const handleSubmit = (values) => props
    .onSubmitForm(values)
    .catch((error) => {
      throw new SubmissionError(error.response && error.response.data);
    });

  return (
    <div>
      <SignInConfirmCodeForm onSubmit={handleSubmit} />
    </div>
  );
}

SignInConfirmCodePage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default createSignInConfirmCodeContainer(SignInConfirmCodePage);
