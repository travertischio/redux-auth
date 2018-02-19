/**
*
* Captcha
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Recaptcha from 'react-recaptcha';
import config from '~/config';

const Captcha = ({ onChange, ...rest }) => (
  <Recaptcha
    {...rest}
    render="explicit"
    sitekey={config.recaptchaSiteKey}
    verifyCallback={onChange}
  />
);

Captcha.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Captcha;
