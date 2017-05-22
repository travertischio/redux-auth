/**
*
* SignUpForm
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
import { email as emailValidator } from 'validators/lib/email';
import { setOfPasswordValidators } from 'validators/lib/setOfPasswordValidators';
import { matchToPassword as matchToPasswordValidator } from 'validators/lib/matchToPassword';
import WrappedInput from '../WrappedInput';
import messages from './messages';

export const SignUpForm = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    valid,
  } = props;
  const formatMessage = props.intl.formatMessage;
  const firstNameLabel = formatMessage(messages.firstName);
  const emailLabel = formatMessage(messages.email);
  const passwordLabel = formatMessage(messages.password);
  const confirmPasswordLabel = formatMessage(messages.confirmPassword);

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
        id="firstName"
        name="first_name"
        type="text"
        label={firstNameLabel}
        placeholder={firstNameLabel}
        validate={[requiredValidator]}
        component={WrappedInput}
      />
      <Field
        id="email"
        name="email"
        type="email"
        label={emailLabel}
        placeholder={emailLabel}
        validate={[requiredValidator, emailValidator]}
        component={WrappedInput}
      />
      <Field
        id="password"
        name="password"
        type="password"
        label={passwordLabel}
        placeholder={passwordLabel}
        validate={setOfPasswordValidators}
        component={WrappedInput}
      />
      <Field
        id="confirmPassword"
        name="confirm_password"
        type="password"
        label={confirmPasswordLabel}
        placeholder={confirmPasswordLabel}
        validate={[requiredValidator, matchToPasswordValidator]}
        component={WrappedInput}
      />
      <div>
        <button
          type="submit"
          disabled={pristine || submitting}
        >Sign Up</button>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'signUpForm',
})(injectIntl(SignUpForm));
