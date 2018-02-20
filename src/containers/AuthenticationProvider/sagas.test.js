/**
 * Test AuthenticationProvider sagas
 */

import { fromJS } from 'immutable';
import { delay } from 'redux-saga';
import {
  testSaga,
  expectSaga,
} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import {
  extendTokenLifetime as extendTokenLifetimeApiCall,
  signOut as signOutApiCall,
  setAuthorizationTokenInHeaders,
  removeAuthorizationTokenInHeaders,
} from '~/api';
import {
  tokenAndUserData,
  tokenAndUserDataResponse,
  validTokenData,
} from '~/test.data';
import {
  clearUserDataAction,
  extendTokenLifetimeAction,
  markAuthenticationProviderAsReadyAction,
  markTokenAsInvalidAction,
  setTokenDataAction,
  signOutFailedAction,
  signOutSuccessAction,
  successAuthenticationResponseAction,
} from './actions';
import sagas, {
  clearTokenSaga,
  defaultSuccessAuthenticationResponseSaga,
  extendTokenLifetimeSaga,
  onFailedAuthenticationResponseAction,
  onSuccessAuthenticationResponseAction,
  putExtendTokenLifetimeActionWithDelaySaga,
  setTokenDataSaga,
  signOutSaga,
  watchClearTokenDataAction,
  watchExtendTokenLifetimeAction,
  watchFailedAuthenticationResponseAction,
  watchLastUserTokenAction,
  watchMarkTokenAsInvalidAction,
  watchSetTokenDataAction,
  watchSignOutAction,
  watchSuccessAuthenticationResponseAction,
  watchTwoFactorSendCodeAction,
} from './sagas';
import {
  CLEAR_TOKEN_DATA_ACTION,
  EXTEND_TOKEN_LIFETIME_ACTION,
  FAILED_AUTHENTICATION_RESPONSE_ACTION,
  SET_TOKEN_DATA_ACTION,
  SIGN_OUT_ACTION,
  SUCCESS_AUTHENTICATION_RESPONSE_ACTION,
} from './constants';
import {
  setAuthDataInStorage,
  removeAuthDataFromStorage,
} from './utils';
import { selectExtendTokenWithinMs } from './selectors';

describe('should export all watchers sagas by default', () => {
  expect(sagas).toEqual([
    watchClearTokenDataAction,
    watchExtendTokenLifetimeAction,
    watchFailedAuthenticationResponseAction,
    watchLastUserTokenAction,
    watchMarkTokenAsInvalidAction,
    watchSetTokenDataAction,
    watchSignOutAction,
    watchSuccessAuthenticationResponseAction,
    watchTwoFactorSendCodeAction,
  ]);
});

it('watchSetTokenDataAction', () => {
  testSaga(watchSetTokenDataAction)
    .next()
    .takeEveryEffect(SET_TOKEN_DATA_ACTION, setTokenDataSaga)
    .next()
    .takeEveryEffect(SET_TOKEN_DATA_ACTION, putExtendTokenLifetimeActionWithDelaySaga)
    .next()
    .finish()
    .isDone();
});

it('watchClearTokenDataAction', () => {
  testSaga(watchClearTokenDataAction)
    .next()
    .takeEveryEffect(CLEAR_TOKEN_DATA_ACTION, clearTokenSaga)
    .next()
    .finish()
    .isDone();
});

it('watchExtendTokenLifetimeAction', () => {
  testSaga(watchExtendTokenLifetimeAction)
    .next()
    .takeEveryEffect(EXTEND_TOKEN_LIFETIME_ACTION, extendTokenLifetimeSaga)
    .next()
    .finish()
    .isDone();
});

it('watchSuccessAuthenticationResponseAction', () => {
  testSaga(watchSuccessAuthenticationResponseAction)
    .next()
    .takeEveryEffect(SUCCESS_AUTHENTICATION_RESPONSE_ACTION, onSuccessAuthenticationResponseAction)
    .next()
    .finish()
    .isDone();
});


it('watchFailedAuthenticationResponseAction', () => {
  testSaga(watchFailedAuthenticationResponseAction)
    .next()
    .takeEveryEffect(FAILED_AUTHENTICATION_RESPONSE_ACTION, onFailedAuthenticationResponseAction)
    .next()
    .finish()
    .isDone();
});


it('setTokenDataSaga', () => {
  const action = {
    tokenData: validTokenData,
  };

  testSaga(setTokenDataSaga, action)
    .next()
    .call(setAuthDataInStorage, { tokenData: validTokenData })
    .next()
    .call(setAuthorizationTokenInHeaders, action.tokenData.key)
    .finish()
    .isDone();
});

it('clearTokenSaga', () => {
  testSaga(clearTokenSaga)
    .next()
    .call(removeAuthDataFromStorage)
    .next()
    .call(removeAuthorizationTokenInHeaders)
    .next()
    .finish()
    .isDone();
});

it('putExtendTokenLifetimeActionWithDelaySaga when token is valid', () => {
  const action = {
    ...tokenAndUserData,
  };
  const tokenExpireInMs = 50000;

  testSaga(putExtendTokenLifetimeActionWithDelaySaga, action)
    .next()
    .select(selectExtendTokenWithinMs)
    .next(tokenExpireInMs)
    .call(delay, tokenExpireInMs)
    .next()
    .put(extendTokenLifetimeAction())
    .finish()
    .isDone();
});

it('extendTokenLifetimeSaga succeed', () => {
  const storeState = fromJS({
    auth: {
      ...tokenAndUserData,
      isReady: false,
    },
  });

  expectSaga(extendTokenLifetimeSaga)
    .withState(storeState)
    .provide([
      [matchers.call.fn(extendTokenLifetimeApiCall), tokenAndUserDataResponse],
    ])
    .put(successAuthenticationResponseAction(tokenAndUserDataResponse))
    .run();
});

it('extendTokenLifetimeSaga failed', () => {
  const storeState = fromJS({
    auth: {
      ...tokenAndUserData,
      isReady: false,
    },
  });

  expectSaga(extendTokenLifetimeSaga)
    .withState(storeState)
    .provide([
      [matchers.call.fn(extendTokenLifetimeApiCall), throwError()],
    ])
    .put(markTokenAsInvalidAction())
    .put(markAuthenticationProviderAsReadyAction())
    .run();
});

it('defaultSuccessAuthenticationResponseSaga', () => {
  const action = {
    response: {
      ...tokenAndUserDataResponse,
    },
  };

  testSaga(defaultSuccessAuthenticationResponseSaga, action)
    .next()
    .put(setTokenDataAction(tokenAndUserData.tokenData))
    .finish()
    .isDone();
});

it('watchSignOutAction', () => {
  testSaga(watchSignOutAction)
    .next()
    .takeEveryEffect(SIGN_OUT_ACTION, signOutSaga)
    .next()
    .finish()
    .isDone();
});

it('signOutSaga', () => {
  testSaga(signOutSaga)
    .next()
    .call(signOutApiCall)
    .next()
    .put(signOutSuccessAction())
    .next()
    .put(markTokenAsInvalidAction())
    .next()
    .put(clearUserDataAction())
    .next()
    .finish()
    .isDone();
});

it('signOutSaga failes', () => {
  const errorResponse = {};

  testSaga(signOutSaga)
    .next()
    .call(signOutApiCall)
    .throw(errorResponse)
    .put(signOutFailedAction())
    .next()
    .put(markTokenAsInvalidAction())
    .next()
    .put(clearUserDataAction())
    .finish()
    .isDone();
});
