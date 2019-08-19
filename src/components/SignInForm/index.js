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
import CaptchaField from '~/components/Captcha/field';
import messages from './messages';

const SignInForm = (props) => {
  const {
    captchaRequired,
    handleSubmit,
    pristine,
    submitting,
  } = props;
  const { formatMessage } = props.intl;
  const emailLabel = formatMessage(messages.email);
  const passwordLabel = formatMessage(messages.password);

  const onSubmit = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    handleSubmit();
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
      {captchaRequired
        && (
          <Field
            name="captcha"
            validate={[requiredValidator]}
            component={CaptchaField}
          />
        )}
      <div>
        <button
          type="submit"
          disabled={pristine || submitting}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

SignInForm.propTypes = {
  captchaRequired: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

SignInForm.defaultProps = {
  captchaRequired: false,
};

export default reduxForm({
  form: 'signInForm',
})(injectIntl(SignInForm));
