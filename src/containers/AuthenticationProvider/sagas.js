import { delay } from 'redux-saga';
import { takeEvery, call, put, select } from 'redux-saga/effects';
import { setTokenInStorage, removeTokenFromStorage } from './utils';
import { setTokenAction, clearTokenAction, refreshTokenAction, markTokenAsRefreshedAction } from './actions';
import { makeSelectToken, makeSelecTokenExpiryTime, makeSelectHasTokenRefreshed } from './selectors';
import { refreshToken as refreshTokenApiCall } from '../../api';
import { REFRESH_TOKEN_ACTION, SET_TOKEN_ACTION, CLEAR_TOKEN_ACTION } from './constants';

export function* defaultSaga() {
  yield takeEvery(SET_TOKEN_ACTION, setToken);
  yield takeEvery(SET_TOKEN_ACTION, putRefreshTokenActionWithDelay);
  yield takeEvery(CLEAR_TOKEN_ACTION, clearToken);
  yield takeEvery(REFRESH_TOKEN_ACTION, refreshToken);
}

export function* setToken(action) {
  const token = action.payload;
  yield call(setTokenInStorage, token);
}

export function* putRefreshTokenActionWithDelay() {
  const tokenExpiryTime = yield select(makeSelecTokenExpiryTime());
  yield delay(tokenExpiryTime);
  yield put(refreshTokenAction());
}

export function* clearToken() {
  yield call(removeTokenFromStorage);
}

export function* refreshToken() {
  const token = yield select(makeSelectToken());

  if (token) {
    try {
      const response = yield call(refreshTokenApiCall, token);
      yield put(setTokenAction(response.data.token));
    } catch (error) {
      yield put(clearTokenAction(error));
    }
  }

  const hasTokenRefreshed = yield select(makeSelectHasTokenRefreshed());

  if (!hasTokenRefreshed) {
    yield put(markTokenAsRefreshedAction());
  }
}

export default [
  defaultSaga,
];
