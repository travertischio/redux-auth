/**
*
* FormError
*
*/

import React from 'react';
import PropTypes from 'prop-types';

function FormError({ error, touched }) {
  if (error && touched) {
    return (
      <div className="error">
        {error}
      </div>
    );
  }
  return null;
}

FormError.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool,
};

export default FormError;
