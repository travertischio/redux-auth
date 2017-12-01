import connectedReduxRedirect from './connectedReduxRedirect';
import { redirectActionWithSupportParamInQueryString } from '../../containers/AuthenticationProvider/actions';
import { selectTokeDataExists } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

export default connectedReduxRedirect({
  authenticatedSelector: selectTokeDataExists,
  redirectAction: redirectActionWithSupportParamInQueryString,
  redirectPath: config.userIsNotAuthenticatedRedirectPath,
  wrapperDisplayName: 'TokeDataExists',
});
