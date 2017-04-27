/**
*
* ResetPasswordForm
*
*/

import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import WrappedInput from '../WrappedInput';
import messages from './messages';

// TODO: extract validation rules to seperate module
function required(value) {
  if (!value) {
    return 'Field required';
  }
  return undefined;
}

function matchNewPasswordWithConfirmation(value, state) {
  const newPassword = state.get('new_password');
  const reNewPassword = state.get('re_new_password');

  if (newPassword !== reNewPassword) {
    return 'Password does not match the confirm password';
  }

  return undefined;
}

export const minLength = (min, label) => (value) => {
  if (value && value.length < min) {
    return label ? `${label} must be ${min} characters or more` : `Must be ${min} characters or more`;
  }
  return undefined;
};

function ResetPasswordForm(props) {
  const { handleSubmit, pristine, submitting, valid } = props;
  const { formatMessage } = props.intl;
  const newPasswordLabel = formatMessage(messages.newPasswordLabel);
  const newPasswordPlaceholder = formatMessage(messages.newPasswordPlaceholder);
  const reNewPassword = formatMessage(messages.reNewPassword);
  const reNewPasswordPlaceholder = formatMessage(messages.reNewPasswordPlaceholder);
  const minLengthOfPassword = minLength(6, newPasswordLabel);

  const onSubmit = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (valid) {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Field
        id="new_password"
        name="new_password"
        type="password"
        label={newPasswordLabel}
        placeholder={newPasswordPlaceholder}
        validate={[required, minLengthOfPassword]}
        component={WrappedInput}
      />
      <Field
        id="re_new_password"
        name="re_new_password"
        type="password"
        label={reNewPassword}
        placeholder={reNewPasswordPlaceholder}
        validate={[required, matchNewPasswordWithConfirmation]}
        component={WrappedInput}
      />
      <div>
        <button
          type="submit"
          disabled={pristine || submitting}
        >Save</button>
      </div>
    </form>
  );
}

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'resetPasswordForm',
})(injectIntl(ResetPasswordForm));
