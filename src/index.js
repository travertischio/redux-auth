import AuthenticationProvider from './containers/AuthenticationProvider';
import createRequestPasswordResetContainer from './containers/RequestPasswordResetPage/create-container';
import createResetPasswordContainer from './containers/ResetPasswordPage/create-container';
import createSignInConfirmCodeContainer from './containers/SignInConfirmCodePage/create-container';
import createSignInContainer from './containers/SignInPage/create-container';
import createSignUpContainer from './containers/SignUpPage/create-container';
import creactUserIsNotAuthenticatedAuthWrapper from './hocs/AuthWrappers/creactUserIsNotAuthenticatedAuthWrapper';
import reducer from './containers/AuthenticationProvider/reducer';
import sagas from './containers/AuthenticationProvider/sagas';
import UserHasRole from './hocs/AuthWrappers/UserHasRole';
import UserIsAdmin from './hocs/AuthWrappers/UserIsAdmin';
import UserIsAuthenticated from './hocs/AuthWrappers/UserIsAuthenticated';
import UserIsNotAuthenticated from './hocs/AuthWrappers/UserIsNotAuthenticated';
import withUserData from './hocs/withUserData';
import { removeAuthorizationTokenInHeaders } from './api';
import config, {
  setConfig,
} from './config';

setConfig({
  signInAuthWrapper: creactUserIsNotAuthenticatedAuthWrapper(config.redirectPathAfterSignIn),
  signUpAuthWrapper: creactUserIsNotAuthenticatedAuthWrapper(config.redirectPathAfterSignUp),
});

export * from './containers/AuthenticationProvider/actions';
export * from './containers/AuthenticationProvider/constants';
export * from './containers/AuthenticationProvider/selectors';
export default AuthenticationProvider;
export {
  AuthenticationProvider,
  createRequestPasswordResetContainer,
  createResetPasswordContainer,
  createSignInConfirmCodeContainer,
  createSignInContainer,
  createSignUpContainer,
  reducer,
  removeAuthorizationTokenInHeaders,
  sagas,
  setConfig,
  UserHasRole,
  UserIsAdmin,
  UserIsAuthenticated,
  UserIsNotAuthenticated,
  withUserData,
};
