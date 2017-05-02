/**
*
* WrappedInput
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormError from '../FormError';
import _isArray from 'lodash/isArray';

function WrappedInput({ input, id, label, placeholder, type, meta: { asyncValidating, touched, error } }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className={asyncValidating ? 'async-validating' : ''}>
        <input
          {...input}
          type={type}
          id={id}
          placeholder={placeholder}
        />
      </div>
      <FormError error={error} touched={touched} />
    </div>
  );
}

WrappedInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default WrappedInput;


function ReduxFormInputWrapper(InputComponent) {
  return class WrappedInputComponent extends Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
      input: PropTypes.object.isRequired,
      meta: PropTypes.object.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      id: PropTypes.string,
    }

    getErrors() {

      const { error, touched } = this.props.meta;

      if (error && touched) {
        return _isArray(error) ? error : [error];
      }

      return null;
    }

    render() {
      const {
        input, id, label, placeholder,
        meta: { asyncValidating },
      } = this.props;

      return (
        <div className={asyncValidating ? 'async-validating' : ''}>
          <InputComponent
            id={id}
            label={label}
            placeholder={placeholder}
            errors={this.getErrors()}
            {...input}
          />
        </div>);
    }
  };
}

export { ReduxFormInputWrapper };
