import { redirectActionWithSupportParamInQueryString } from '~/containers/AuthenticationProvider/actions';
import { selectTokeIsValid } from '~/containers/AuthenticationProvider/selectors';
import config from '~/config';
import connectedReduxRedirect from './connectedReduxRedirect';

export default connectedReduxRedirect({
  authenticatedSelector: selectTokeIsValid,
  redirectAction: redirectActionWithSupportParamInQueryString,
  redirectPath: () => config.userIsNotAuthenticatedRedirectPath,
  wrapperDisplayName: 'TokeIsValid',
});
