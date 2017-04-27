/**
*
* RequestPasswordResetForm
*
*/

import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import WrappedInput from '../WrappedInput';
import messages from './messages';

function RequestPasswordResetForm(props) {
  const { handleSubmit, pristine, submitting, valid } = props;
  const { formatMessage } = props.intl;
  const emailLabel = formatMessage(messages.email);

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
        id="email"
        name="email"
        type="email"
        label={emailLabel}
        placeholder={emailLabel}
        validate={[required, email]}
        component={WrappedInput}
      />
      <div>
        <button
          type="submit"
          disabled={pristine || submitting}
        >Submit</button>
      </div>
    </form>
  );
}

RequestPasswordResetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
};

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

export default reduxForm({
  form: 'requestPasswordResetForm',
})(injectIntl(RequestPasswordResetForm));
