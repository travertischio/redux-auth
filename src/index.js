import AuthenticationProvider from './containers/AuthenticationProvider';
import reducer from './containers/AuthenticationProvider/reducer';
import sagas from './containers/AuthenticationProvider/sagas';
import { setConfig } from './config';
import createRequestPasswordResetContainer from './containers/RequestPasswordResetPage/create-container';
import createResetPasswordContainer from './containers/ResetPasswordPage/create-container';
import createSignInContainer from './containers/SignInPage/create-container';
import createSignInConfirmCodeContainer from './containers/SignInConfirmCodePage/create-container';
import createSignUpContainer from './containers/SignUpPage/create-container';
import UserHasRole from './hocs/AuthWrappers/UserHasRole';
import UserIsAdmin from './hocs/AuthWrappers/UserIsAdmin';
import UserIsAuthenticated from './hocs/AuthWrappers/UserIsAuthenticated';
import UserIsNotAuthenticated from './hocs/AuthWrappers/UserIsNotAuthenticated';
import {
  selectUser,
  selectIsAuthenticated,
} from './containers/AuthenticationProvider/selectors';
import {
  setTokenDataAction,
  clearTokenDataAction,
  extendTokenLifetimeAction,
  redirectActionWithSupportParamInQueryString,
} from './containers/AuthenticationProvider/actions';
import { removeAuthorizationTokenInHeaders } from './api';

export default AuthenticationProvider;
export {
  AuthenticationProvider,
  reducer,
  sagas,
  setConfig,
  createRequestPasswordResetContainer,
  createResetPasswordContainer,
  createSignInContainer,
  createSignInConfirmCodeContainer,
  createSignUpContainer,
  UserHasRole,
  UserIsAdmin,
  UserIsAuthenticated,
  UserIsNotAuthenticated,
  selectUser,
  selectIsAuthenticated,
  setTokenDataAction,
  clearTokenDataAction,
  extendTokenLifetimeAction,
  redirectActionWithSupportParamInQueryString,
  removeAuthorizationTokenInHeaders,
};
