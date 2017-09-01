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
import {
  selectUser,
  selectIsAuthenticated,
 } from './containers/AuthenticationProvider/selectors';
import {
  setTokenAction,
  clearTokenAction,
  refreshTokenAction,
 } from './containers/AuthenticationProvider/actions';

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
 selectUser as exportedSelectUser,
 selectIsAuthenticated as exportedSelectIsAuthenticated,
 setTokenAction as exportedSetTokenAction,
 clearTokenAction as exportedClearTokenAction,
 refreshTokenAction as exportedRefreshTokenAction,
} from './';

describe('redux-auth exports', () => {
  it('should export AuthenticationProvider by default', () => {
    expect(exportedAuthenticationProvider).toBe(AuthenticationProvider);
  });

  it('should export reducer', () => {
    expect(exportedReducer).toBe(reducer);
  });

  it('should export sagas', () => {
    expect(exportedSagas).toBe(sagas);
  });

  it('should export setConfig', () => {
    expect(exportedSetConfig).toBe(setConfig);
  });

  it('should export createRequestPasswordResetContainer', () => {
    expect(exportedCreateRequestPasswordResetContainer).toBe(createRequestPasswordResetContainer);
  });

  it('should export createResetPasswordContainer', () => {
    expect(exportedCreateResetPasswordContainer).toBe(createResetPasswordContainer);
  });

  it('should export createSignInContainer', () => {
    expect(exportedCreateSignInContainer).toBe(createSignInContainer);
  });

  it('should export createSignUpContainer', () => {
    expect(exportedCreateSignUpContainer).toBe(createSignUpContainer);
  });

  it('should export UserHasRole', () => {
    expect(exportedUserHasRole).toBe(UserHasRole);
  });

  it('should export UserIsAdmin', () => {
    expect(exportedUserIsAdmin).toBe(UserIsAdmin);
  });

  it('should export UserIsAuthenticated', () => {
    expect(exportedUserIsAuthenticated).toBe(UserIsAuthenticated);
  });

  it('should export UserIsNotAuthenticated', () => {
    expect(exportedUserIsNotAuthenticated).toBe(UserIsNotAuthenticated);
  });

  it('should export selectUser', () => {
    expect(exportedSelectUser).toBe(selectUser);
  });

  it('should export setTokenAction', () => {
    expect(exportedSetTokenAction).toBe(setTokenAction);
  });

  it('should export selectIsAuthenticated', () => {
    expect(exportedSelectIsAuthenticated).toBe(selectIsAuthenticated);
  });

  it('should export clearTokenAction', () => {
    expect(exportedClearTokenAction).toBe(clearTokenAction);
  });

  it('should export refreshTokenAction', () => {
    expect(exportedRefreshTokenAction).toBe(refreshTokenAction);
  });
});
