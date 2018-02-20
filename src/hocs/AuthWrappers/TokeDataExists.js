import { redirectActionWithSupportParamInQueryString } from '~/containers/AuthenticationProvider/actions';
import { selectTokeDataExists } from '~/containers/AuthenticationProvider/selectors';
import config from '~/config';
import connectedReduxRedirect from './connectedReduxRedirect';

export default connectedReduxRedirect({
  authenticatedSelector: selectTokeDataExists,
  redirectAction: redirectActionWithSupportParamInQueryString,
  redirectPath: () => config.userIsNotAuthenticatedRedirectPath,
  wrapperDisplayName: 'TokeDataExists',
});
