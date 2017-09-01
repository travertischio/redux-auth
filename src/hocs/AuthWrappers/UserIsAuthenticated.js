import { UserAuthWrapper } from 'redux-auth-wrapper';
import { redirectActionWithSupportParamInQueryString } from '../../containers/AuthenticationProvider/actions';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: selectUser,
  redirectAction: redirectActionWithSupportParamInQueryString,
  failureRedirectPath: config.userIsNotAuthenticatedRedirectPath,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export default UserIsAuthenticated;
