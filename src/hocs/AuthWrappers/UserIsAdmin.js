import { UserAuthWrapper } from 'redux-auth-wrapper';
import { redirectActionWithSupportParamInQueryString } from '../../containers/AuthenticationProvider/actions';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

const UserIsAdmin = UserAuthWrapper({
  authSelector: selectUser,
  predicate: isAdmin,
  redirectAction: redirectActionWithSupportParamInQueryString,
  failureRedirectPath: config.userIsNotAdminRedirectPath,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsAdmin',
});

function isAdmin(user) {
  return user && user.role === config.adminRole;
}

export default UserIsAdmin;
