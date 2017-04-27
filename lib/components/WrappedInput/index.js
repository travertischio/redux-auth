/**
*
* WrappedInput
*
*/

import React, { PropTypes } from 'react';
import FormError from '../FormError';

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
