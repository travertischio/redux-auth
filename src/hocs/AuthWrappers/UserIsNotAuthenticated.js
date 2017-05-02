import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
// TODO: move it to redux-auth
import { selectUser } from 'redux-auth/lib/containers/AuthenticationProvider/selectors';

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: selectUser,
  predicate: isNotAuthenticated,
  redirectAction: routerActions.replace,
  // TODO: move url of default homepage/dashboard to the config file
  failureRedirectPath: '/home',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated',
});

function isNotAuthenticated(user) {
  return !user;
}

export default UserIsNotAuthenticated;
