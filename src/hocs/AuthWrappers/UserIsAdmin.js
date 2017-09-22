import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { redirectActionWithSupportParamInQueryString } from '../../containers/AuthenticationProvider/actions';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

const UserIsAdmin = connectedReduxRedirect({
  authenticatedSelector: isAdminSelector,
  redirectAction: redirectActionWithSupportParamInQueryString,
  redirectPath: config.userIsNotAdminRedirectPath,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsAdmin',
});

function isAdminSelector(state) {
  const user = selectUser(state);

  return user && user.role === config.adminRole;
}

export default UserIsAdmin;
