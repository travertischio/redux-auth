/**
*
* FormError
*
*/

import React, { PropTypes } from 'react';

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
