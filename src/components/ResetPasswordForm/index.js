/**
*
* ResetPasswordForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
  Field,
  reduxForm,
} from 'redux-form/immutable';
import { required as requiredValidator } from 'validators/lib/required';
import { setOfPasswordValidators } from 'validators/lib/setOfPasswordValidators';
import { matchToNewPassowrd as matchToNewPassowrdValidator } from 'validators/lib/matchToNewPassowrd';
import WrappedInput from '../WrappedInput';
import messages from './messages';

function ResetPasswordForm(props) {
  const {
    handleSubmit,
    pristine,
    submitting,
    valid,
  } = props;
  const { formatMessage } = props.intl;
  const newPasswordLabel = formatMessage(messages.newPasswordLabel);
  const newPasswordPlaceholder = formatMessage(messages.newPasswordPlaceholder);
  const reNewPassword = formatMessage(messages.reNewPassword);
  const reNewPasswordPlaceholder = formatMessage(messages.reNewPasswordPlaceholder);

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
        validate={setOfPasswordValidators}
        component={WrappedInput}
      />
      <Field
        id="re_new_password"
        name="re_new_password"
        type="password"
        label={reNewPassword}
        placeholder={reNewPasswordPlaceholder}
        validate={[requiredValidator, matchToNewPassowrdValidator]}
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
