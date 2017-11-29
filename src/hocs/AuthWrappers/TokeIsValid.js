import connectedReduxRedirect from './connectedReduxRedirect';
import { redirectActionWithSupportParamInQueryString } from '../../containers/AuthenticationProvider/actions';
import { selectTokeIsValid } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

export default connectedReduxRedirect({
  authenticatedSelector: selectTokeIsValid,
  redirectAction: redirectActionWithSupportParamInQueryString,
  redirectPath: config.userIsNotAuthenticatedRedirectPath,
  wrapperDisplayName: 'TokeIsValid',
});
