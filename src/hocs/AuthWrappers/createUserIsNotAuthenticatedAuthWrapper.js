import { selectIsAuthenticated } from '~/containers/AuthenticationProvider/selectors';
import { redirectActionWithSupportParamInQueryString } from '~/containers/AuthenticationProvider/actions';
import connectedReduxRedirect from './connectedReduxRedirect';

function createUserIsNotAuthenticatedAuthWrapper(redirectPath) {
  return connectedReduxRedirect({
    authenticatedSelector: isNotAuthenticatedSelector,
    redirectAction: redirectActionWithSupportParamInQueryString,
    allowRedirectBack: false,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath,
  });
}

function isNotAuthenticatedSelector(state) {
  const isAuthenticated = selectIsAuthenticated(state);

  return !isAuthenticated;
}

export default createUserIsNotAuthenticatedAuthWrapper;
