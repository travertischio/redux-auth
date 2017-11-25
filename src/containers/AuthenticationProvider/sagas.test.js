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
  setTokenDataAction,
  clearTokenDataAction,
  extendTokenLifetimeAction,
  markAuthenticationProviderAsReadyAction,
  signOutFailedAction,
  clearUserDataAction,
} from './actions';
import {
  extendTokenLifetime as extendTokenLifetimeApiCall,
  signOut as signOutApiCall,
  setAuthorizationTokenInHeaders,
  removeAuthorizationTokenInHeaders,
} from '../../api';
import sagas, {
  clearTokenSaga,
  handleAuthenticationSaga,
  putExtendTokenLifetimeActionWithDelaySaga,
  extendTokenLifetimeSaga,
  setTokenDataSaga,
  watchClearTokenDataAction,
  watchExtendTokenLifetimeAction,
  watchSetTokenDataAction,
  watchTwoFactorSendCodeAction,
  watchSignOutAction,
  signOutSaga,
} from './sagas';
import {
  EXTEND_TOKEN_LIFETIME_ACTION,
  SET_TOKEN_DATA_ACTION,
  CLEAR_TOKEN_DATA_ACTION,
  SIGN_OUT_ACTION,
} from './constants';
import {
  setAuthDataInStorage,
  removeAuthDataFromStorage,
} from './utils';
import { selectTokenExpireInMs } from './selectors';
import {
  tokenAndUserData,
  tokenAndUserDataResponse,
  tokenData,
} from '../../test.data';

describe('should export all watchers sagas by default', () => {
  expect(sagas).toEqual([
    watchClearTokenDataAction,
    watchExtendTokenLifetimeAction,
    watchSetTokenDataAction,
    watchSignOutAction,
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

it('setTokenDataSaga', () => {
  const action = {
    tokenData,
  };

  testSaga(setTokenDataSaga, action)
    .next()
    .call(setAuthDataInStorage, { tokenData })
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
    .select(selectTokenExpireInMs)
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
    .put(setTokenDataAction(tokenAndUserDataResponse.data.tokenData))
    .put(markAuthenticationProviderAsReadyAction())
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
    .put(clearTokenDataAction())
    .put(markAuthenticationProviderAsReadyAction())
    .run();
});

it('handleAuthenticationSaga', () => {
  const action = {
    payload: {
      ...tokenAndUserDataResponse,
    },
  };

  testSaga(handleAuthenticationSaga, action)
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
    .put(clearTokenDataAction())
    .next()
    .put(clearUserDataAction())
    // .next()
    // .put(push(config.redirectPathAfterSignOut))
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
    .put(clearTokenDataAction())
    .next()
    .put(clearUserDataAction())
    // .next()
    // .put(push(config.redirectPathAfterSignOut))
    .finish()
    .isDone();
});
