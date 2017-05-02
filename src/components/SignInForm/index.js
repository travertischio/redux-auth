/**
*
* SignInForm
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import EmailField from 'react-form-fields/lib/EmailField';
import PasswordField from 'react-form-fields/lib/PasswordField';
import { ReduxFormInputWrapper } from '../WrappedInput';
import messages from './messages';

const SignInForm = (props) => {
  const { handleSubmit, pristine, submitting, valid } = props;
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
        label={emailLabel}
        placeholder={emailLabel}
        validate={[required, email]}
        component={ReduxFormInputWrapper(EmailField)}
      />
      <Field
        name="password"
        type="password"
        label={passwordLabel}
        placeholder={passwordLabel}
        validate={[required]}
        component={ReduxFormInputWrapper(PasswordField)}
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

// SignInForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   pristine: PropTypes.bool.isRequired,
//   submitting: PropTypes.bool.isRequired,
//   valid: PropTypes.bool.isRequired,
//   intl: PropTypes.object.isRequired,
// };

export default reduxForm({
  form: 'signInForm',
})(injectIntl(SignInForm));

// TODO: extract validation rules to seperate module
function required(value) {
  if (!value) {
    return 'Field required';
  }
  return undefined;
}

function email(value) {
  if (value && (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value))) {
    return 'Email format invalid';
  }
  return undefined;
}
