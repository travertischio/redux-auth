import connectedReduxRedirect from './connectedReduxRedirect';
import { selectIsAuthenticated } from '../../containers/AuthenticationProvider/selectors';
import { redirectActionWithSupportParamInQueryString } from '../../containers/AuthenticationProvider/actions';

function creactUserIsNotAuthenticatedAuthWrapper(redirectPath) {
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

export default creactUserIsNotAuthenticatedAuthWrapper;
