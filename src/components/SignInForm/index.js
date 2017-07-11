/**
*
* SignInForm
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
import PasswordField from 'react-form-fields/lib/PasswordField/reduxForm';
import { required as requiredValidator } from 'validators/lib/required';
import { email as emailValidator } from 'validators/lib/email';
import messages from './messages';

const SignInForm = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    valid,
  } = props;
  const { formatMessage } = props.intl;
  const emailLabel = formatMessage(messages.email);
  const passwordLabel = formatMessage(messages.password);

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
        name="email"
        id="email"
        label={emailLabel}
        placeholder={emailLabel}
        validate={[requiredValidator, emailValidator]}
        component={EmailField}
      />
      <Field
        name="password"
        id="password"
        label={passwordLabel}
        placeholder={passwordLabel}
        validate={[requiredValidator]}
        component={PasswordField}
      />
      <div>
        <button
          type="submit"
          disabled={pristine || submitting}
        >Sign In</button>
      </div>
    </form>
  );
};

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'signInForm',
})(injectIntl(SignInForm));

