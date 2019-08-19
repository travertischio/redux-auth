/*
 *
 * SignInPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import SignInForm from '~/components/SignInForm';
import BlockedAccount from '~/components/BlockedAccount';
import createSignInContainer from './create-container';

function SignInPage(props) {
  const {
    onSubmitForm,
    SignInPage: {
      blockedAccount,
      captchaRequired,
      errorMessage,
      loading,
    },
  } = props;

  return (
    <div>
      {blockedAccount
        && <BlockedAccount />}

      {!blockedAccount
      && (
        <>
          { loading && <div>Processing... Please wait.</div> }
          { errorMessage && <div>{errorMessage}</div> }

          <SignInForm
            captchaRequired={captchaRequired}
            onSubmit={onSubmitForm}
          />
        </>
      )}
    </div>
  );
}

SignInPage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  SignInPage: PropTypes.object.isRequired,
};

export default createSignInContainer(SignInPage);
