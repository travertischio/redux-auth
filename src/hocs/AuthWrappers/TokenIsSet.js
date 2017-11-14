import connectedReduxRedirect from './connectedReduxRedirect';
import { redirectActionWithSupportParamInQueryString } from '../../containers/AuthenticationProvider/actions';
import { selectTokenDataExists } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

export default connectedReduxRedirect({
  authenticatedSelector: selectTokenDataExists,
  redirectAction: redirectActionWithSupportParamInQueryString,
  redirectPath: config.userIsNotAuthenticatedRedirectPath,
  wrapperDisplayName: 'TokenIsSet',
});
