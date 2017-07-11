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
import EmailField from 'react-form-fields/lib/EmailField/reduxForm';
import TextField from 'react-form-fields/lib/TextInputField/reduxForm';
import PasswordField from 'react-form-fields/lib/PasswordField/reduxForm';
import { required as requiredValidator } from 'validators/lib/required';
import { email as emailValidator } from 'validators/lib/email';
import { setOfPasswordValidators } from 'validators/lib/setOfPasswordValidators';
import { matchToPassword as matchToPasswordValidator } from 'validators/lib/matchToPassword';
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
        name="firstName"
        label={firstNameLabel}
        placeholder={firstNameLabel}
        validate={[requiredValidator]}
        component={TextField}
      />
      <Field
        id="email"
        name="email"
        label={emailLabel}
        placeholder={emailLabel}
        validate={[requiredValidator, emailValidator]}
        component={EmailField}
      />
      <Field
        id="password"
        name="password"
        label={passwordLabel}
        placeholder={passwordLabel}
        validate={setOfPasswordValidators}
        component={PasswordField}
      />
      <Field
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label={confirmPasswordLabel}
        placeholder={confirmPasswordLabel}
        validate={[requiredValidator, matchToPasswordValidator]}
        component={PasswordField}
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
