import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

const UserIsAdmin = UserAuthWrapper({
  authSelector: selectUser,
  predicate: isAdmin,
  redirectAction: routerActions.replace,
  failureRedirectPath: config.userIsNotAdminRedirectPath,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsAdmin',
});

function isAdmin(user) {
  return user && user.role === config.adminRole;
}

export default UserIsAdmin;
