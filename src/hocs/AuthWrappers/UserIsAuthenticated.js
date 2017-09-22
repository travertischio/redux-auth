import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { redirectActionWithSupportParamInQueryString } from '../../containers/AuthenticationProvider/actions';
import { selectIsAuthenticated } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

const UserIsAuthenticated = connectedReduxRedirect({
  authenticatedSelector: selectIsAuthenticated,
  redirectAction: redirectActionWithSupportParamInQueryString,
  redirectPath: config.userIsNotAuthenticatedRedirectPath,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export default UserIsAuthenticated;
