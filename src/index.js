import AuthenticationProvider from './containers/AuthenticationProvider';
import reducer from './containers/AuthenticationProvider/reducer';
import sagas from './containers/AuthenticationProvider/sagas';

import createRequestPasswordResetContainer from './containers/RequestPasswordResetPage/create-container';
import createResetPasswordContainer from './containers/ResetPasswordPage/create-container';
import createSignInContainer from './containers/SignInPage/create-container';
import createSignUpContainer from './containers/SignUpPage/create-container';

export default AuthenticationProvider;
export {
  AuthenticationProvider,
  reducer,
  sagas,
  createRequestPasswordResetContainer,
  createResetPasswordContainer,
  createSignInContainer,
  createSignUpContainer,
};
