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
  setTokenAction,
  clearTokenAction,
  refreshTokenAction,
  markTokenAsRefreshedAction,
} from '../AuthenticationProvider/actions';
import {
  refreshToken as refreshTokenApiCall,
  setAuthorizationTokenInHeaders,
  removeAuthorizationTokenInHeaders,
} from '../../api';
import sagas, {
  watchSetTokenAction,
  watchSetPermanentTokenAndDeviceIdAction,
  watchClearTokenAction,
  watchRefreshTokenAction,
  setTokenSaga,
  setPermanentTokenAndDeviceIdSaga,
  putRefreshTokenActionWithDelaySaga,
  clearTokenSaga, refreshTokenSaga,
  setTokenIfExistsSaga,
} from './sagas';
import {
  REFRESH_TOKEN_ACTION,
  SET_PERMANENT_TOKEN_AND_DEVICE_ID_ACTION,
  SET_TOKEN_ACTION,
  CLEAR_TOKEN_ACTION,
} from './constants';
import {
  setAuthDataInStorage,
  removeAuthDataFromStorage,
} from './utils';
import { selectTokenExpiryTime } from './selectors';


describe('should export all watchers sagas by default', () => {
  expect(sagas).toEqual([
    watchSetTokenAction,
    watchSetPermanentTokenAndDeviceIdAction,
    watchClearTokenAction,
    watchRefreshTokenAction,
  ]);
});

it('watchSetTokenAction', () => {
  testSaga(watchSetTokenAction)
    .next()
    .takeEveryEffect(SET_TOKEN_ACTION, setTokenSaga)
    .next()
    .takeEveryEffect(SET_TOKEN_ACTION, putRefreshTokenActionWithDelaySaga)
    .next()
    .finish()
    .isDone();
});

it('watchSetPermanentTokenAndDeviceIdAction', () => {
  testSaga(watchSetPermanentTokenAndDeviceIdAction)
    .next()
    .takeEveryEffect(SET_PERMANENT_TOKEN_AND_DEVICE_ID_ACTION, setPermanentTokenAndDeviceIdSaga)
    .next()
    .finish()
    .isDone();
});

it('watchClearTokenAction', () => {
  testSaga(watchClearTokenAction)
    .next()
    .takeEveryEffect(CLEAR_TOKEN_ACTION, clearTokenSaga)
    .next()
    .finish()
    .isDone();
});

it('watchRefreshTokenAction', () => {
  testSaga(watchRefreshTokenAction)
    .next()
    .takeEveryEffect(REFRESH_TOKEN_ACTION, refreshTokenSaga)
    .next()
    .finish()
    .isDone();
});

it('setTokenSaga', () => {
  const action = {
    payload: 'XYZ123',
  };

  testSaga(setTokenSaga, action)
    .next()
    .call(setAuthDataInStorage, { token: action.payload })
    .next()
    .call(setAuthorizationTokenInHeaders, action.payload)
    .finish()
    .isDone();
});

it('setPermanentTokenAndDeviceIdSaga', () => {
  const action = {
    payload: {
      permanentToken: '1cfbe9a1cf13xeedf1a2fc784xb7caf8a95cd48a',
      deviceId: 5342,
    },
  };

  testSaga(setPermanentTokenAndDeviceIdSaga, action)
    .next()
    .call(setAuthDataInStorage, { ...action.payload })
    .next()
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

it('putRefreshTokenActionWithDelaySaga', () => {
  const tokenExpiryTime = 50000;

  testSaga(putRefreshTokenActionWithDelaySaga)
    .next()
    .select(selectTokenExpiryTime)
    .next(tokenExpiryTime)
    .call(delay, tokenExpiryTime)
    .next()
    .put(refreshTokenAction())
    .finish()
    .isDone();
});

it('refreshTokenSaga succeed', () => {
  const storeState = fromJS({
    auth: {
      token: 'XYZ123',
      permanentToken: 'ASD123',
      hasTokenRefreshed: false,
    },
  });

  const response = {
    data: {
      token: 'NEW_XYZ123',
      permanent_token: null,
    },
  };

  expectSaga(refreshTokenSaga)
    .withState(storeState)
    .provide([
      [matchers.call.fn(refreshTokenApiCall), response],
    ])
    .put(setTokenAction(response.data.token))
    .put(markTokenAsRefreshedAction())
    .run();
});

it('refreshTokenSaga failed', () => {
  const storeState = fromJS({
    auth: {
      token: 'XYZ123',
      permanentToken: 'ASD123',
      hasTokenRefreshed: false,
    },
  });

  expectSaga(refreshTokenSaga)
    .withState(storeState)
    .provide([
      [matchers.call.fn(refreshTokenApiCall), throwError()],
    ])
    .put(clearTokenAction())
    .put(markTokenAsRefreshedAction())
    .run();
});

it('refreshTokenSaga when there is no permanentToken', () => {
  const storeState = fromJS({
    auth: {
      token: 'XYZ123',
      permanentToken: null,
      hasTokenRefreshed: false,
    },
  });

  expectSaga(refreshTokenSaga)
    .withState(storeState)
    .provide([
      [matchers.call.fn(refreshTokenApiCall), throwError()],
    ])
    .put(markTokenAsRefreshedAction())
    .run();
});

it('setTokenIfExistsSaga', () => {
  const token = 'XYZ123';
  const action = {
    payload: {
      data: {
        token,
      },
    },
  };

  testSaga(setTokenIfExistsSaga, action)
    .next()
    .put(setTokenAction(token))
    .finish()
    .isDone();
});

