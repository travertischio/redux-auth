/**
*
* SignInConfirmCodeForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
  Field,
  reduxForm,
} from 'redux-form/immutable';
import TextField from 'react-form-fields/lib/TextField/reduxForm';
import { required as requiredValidator } from 'validators/lib/required';
import messages from './messages';

const SignInConfirmCodeForm = (props) => {
  const {
    pristine,
    submitting,
  } = props;
  const { formatMessage } = props.intl;
  const codeLabel = formatMessage(messages.code);

  const handleSubmit = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    props.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field
        name="code"
        id="code"
        label={codeLabel}
        placeholder={codeLabel}
        validate={[requiredValidator]}
        component={TextField}
      />
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

SignInConfirmCodeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'signInConfirmCodeForm',
})(injectIntl(SignInConfirmCodeForm));
