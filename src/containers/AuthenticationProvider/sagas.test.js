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
} from '../AuthenticationProvider/actions';
import {
  extendTokenLifetime as extendTokenLifetimeApiCall,
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
} from './sagas';
import {
  EXTEND_TOKEN_LIFETIME_ACTION,
  SET_TOKEN_DATA_ACTION,
  CLEAR_TOKEN_DATA_ACTION,
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
    watchSetTokenDataAction,
    watchClearTokenDataAction,
    watchTwoFactorSendCodeAction,
    watchExtendTokenLifetimeAction,
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

