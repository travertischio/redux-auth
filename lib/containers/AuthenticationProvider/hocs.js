import { PropTypes } from 'react';
import getContext from 'recompose/getContext';

export const AuthenticationContext = getContext({
  isAuthenticated: PropTypes.bool,
});
