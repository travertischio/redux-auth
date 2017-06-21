import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { selectUser } from '../AuthenticationProvider/selectors';
import config from '../../config';

const SignUpForNotAuthenticatedUsers = UserAuthWrapper({
  authSelector: selectUser,
  predicate: isNotAuthenticated,
  redirectAction: routerActions.replace,
  failureRedirectPath: config.redirectPathAfterSignIn,
  allowRedirectBack: false,
  wrapperDisplayName: 'SignUpForNotAuthenticatedUsers',
});

function isNotAuthenticated(user) {
  return !user;
}

export default SignUpForNotAuthenticatedUsers;
