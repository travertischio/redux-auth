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
} from '../../api';
import {
  defaultSaga,
  setTokenSaga,
  putRefreshTokenActionWithDelaySaga,
  clearTokenSaga, refreshTokenSaga,
  setTokenIfExistsSaga } from './sagas';
import {
  REFRESH_TOKEN_ACTION,
  SET_TOKEN_ACTION,
  CLEAR_TOKEN_ACTION,
} from './constants';
import {
  setTokenInStorage,
  removeTokenFromStorage,
} from './utils';
import { selectTokenExpiryTime } from './selectors';

it('defaultSaga', () => {
  testSaga(defaultSaga)
    .next()
    .takeEveryEffect(SET_TOKEN_ACTION, setTokenSaga)
    .next()
    .takeEveryEffect(SET_TOKEN_ACTION, putRefreshTokenActionWithDelaySaga)
    .next()
    .takeEveryEffect(CLEAR_TOKEN_ACTION, clearTokenSaga)
    .next()
    .takeEveryEffect(REFRESH_TOKEN_ACTION, refreshTokenSaga)
    .finish()
    .isDone();
});

it('setTokenSaga', () => {
  const action = {
    payload: 'XYZ123',
  };

  testSaga(setTokenSaga, action)
    .next()
    .call(setTokenInStorage, action.payload)
    .next()
    .call(setAuthorizationTokenInHeaders, action.payload)
    .finish()
    .isDone();
});

it('clearTokenSaga', () => {
  testSaga(clearTokenSaga)
    .next()
    .call(removeTokenFromStorage)
    .finish()
    .isDone();
});

it('putRefreshTokenActionWithDelaySaga', () => {
  testSaga(putRefreshTokenActionWithDelaySaga)
    .next()
    .select(selectTokenExpiryTime)
    .next()
    .call(delay, undefined)
    .next()
    .put(refreshTokenAction())
    .finish()
    .isDone();
});

it('refreshTokenSaga succeed', () => {
  const storeState = fromJS({
    auth: {
      token: 'XYZ123',
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

it('refreshTokenSaga and failed', () => {
  const storeState = fromJS({
    auth: {
      token: 'XYZ123',
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

