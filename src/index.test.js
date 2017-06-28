import AuthenticationProvider from './containers/AuthenticationProvider';
import reducer from './containers/AuthenticationProvider/reducer';
import sagas from './containers/AuthenticationProvider/sagas';
import { setConfig } from './config';
import createRequestPasswordResetContainer from './containers/RequestPasswordResetPage/create-container';
import createResetPasswordContainer from './containers/ResetPasswordPage/create-container';
import createSignInContainer from './containers/SignInPage/create-container';
import createSignUpContainer from './containers/SignUpPage/create-container';
import UserHasRole from './hocs/AuthWrappers/UserHasRole';
import UserIsAdmin from './hocs/AuthWrappers/UserIsAdmin';
import UserIsAuthenticated from './hocs/AuthWrappers/UserIsAuthenticated';
import UserIsNotAuthenticated from './hocs/AuthWrappers/UserIsNotAuthenticated';

import exportedAuthenticationProvider, {
 reducer as exportedReducer,
 sagas as exportedSagas,
 setConfig as exportedSetConfig,
 createRequestPasswordResetContainer as exportedCreateRequestPasswordResetContainer,
 createResetPasswordContainer as exportedCreateResetPasswordContainer,
 createSignInContainer as exportedCreateSignInContainer,
 createSignUpContainer as exportedCreateSignUpContainer,
 UserHasRole as exportedUserHasRole,
 UserIsAdmin as exportedUserIsAdmin,
 UserIsAuthenticated as exportedUserIsAuthenticated,
 UserIsNotAuthenticated as exportedUserIsNotAuthenticated,
} from './';

describe('redux-auth exports', () => {
  it('should export AuthenticationProvider by default', () => {
    expect(exportedAuthenticationProvider).toBe(AuthenticationProvider);
  });

  it('should export AuthenticationProvider by default', () => {
    expect(exportedReducer).toBe(reducer);
  });

  it('should export AuthenticationProvider by default', () => {
    expect(exportedSagas).toBe(sagas);
  });

  it('should export AuthenticationProvider by default', () => {
    expect(exportedSetConfig).toBe(setConfig);
  });

  it('should export AuthenticationProvider by default', () => {
    expect(exportedCreateRequestPasswordResetContainer).toBe(createRequestPasswordResetContainer);
  });

  it('should export AuthenticationProvider by default', () => {
    expect(exportedCreateResetPasswordContainer).toBe(createResetPasswordContainer);
  });

  it('should export AuthenticationProvider by default', () => {
    expect(exportedCreateSignInContainer).toBe(createSignInContainer);
  });

  it('should export AuthenticationProvider by default', () => {
    expect(exportedCreateSignUpContainer).toBe(createSignUpContainer);
  });

  it('should export AuthenticationProvider by default', () => {
    expect(exportedUserHasRole).toBe(UserHasRole);
  });

  it('should export AuthenticationProvider by default', () => {
    expect(exportedUserIsAdmin).toBe(UserIsAdmin);
  });

  it('should export AuthenticationProvider by default', () => {
    expect(exportedUserIsAuthenticated).toBe(UserIsAuthenticated);
  });

  it('should export AuthenticationProvider by default', () => {
    expect(exportedUserIsNotAuthenticated).toBe(UserIsNotAuthenticated);
  });
});
