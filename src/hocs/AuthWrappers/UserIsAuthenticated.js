import { redirectActionWithSupportParamInQueryString } from '~/containers/AuthenticationProvider/actions';
import { selectIsAuthenticated } from '~/containers/AuthenticationProvider/selectors';
import config from '~/config';
import connectedReduxRedirect from './connectedReduxRedirect';

const UserIsAuthenticated = connectedReduxRedirect({
  authenticatedSelector: selectIsAuthenticated,
  redirectAction: redirectActionWithSupportParamInQueryString,
  redirectPath: () => config.userIsNotAuthenticatedRedirectPath,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export default UserIsAuthenticated;
