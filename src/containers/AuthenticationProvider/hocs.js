import PropTypes from 'prop-types';
import getContext from 'recompose/getContext';

export const AuthenticationContext = getContext({
  isAuthenticated: PropTypes.bool,
});
