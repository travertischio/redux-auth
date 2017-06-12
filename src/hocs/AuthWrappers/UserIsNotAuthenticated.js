import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: selectUser,
  predicate: isNotAuthenticated,
  redirectAction: routerActions.replace,
  failureRedirectPath: config.userIsAuthenticatedRedirectPath,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated',
});

function isNotAuthenticated(user) {
  return !user;
}

export default UserIsNotAuthenticated;
