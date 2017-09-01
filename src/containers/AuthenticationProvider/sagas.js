import { delay } from 'redux-saga';
import {
  takeEvery,
  call,
  put,
  select,
} from 'redux-saga/effects';
import {
  setTokenInStorage,
  removeTokenFromStorage,
} from './utils';
import {
  setTokenAction,
  clearTokenAction,
  refreshTokenAction,
  markTokenAsRefreshedAction,
} from './actions';
import {
  selectToken,
  selectTokenExpiryTime,
  selectHasTokenRefreshed,
  selectTokenFromActionPayload,
} from './selectors';
import {
  refreshToken as refreshTokenApiCall,
  setAuthorizationTokenInHeaders,
} from '../../api';
import {
  REFRESH_TOKEN_ACTION,
  SET_TOKEN_ACTION,
  CLEAR_TOKEN_ACTION,
} from './constants';

export function* defaultSaga() {
  yield takeEvery(SET_TOKEN_ACTION, setTokenSaga);
  yield takeEvery(SET_TOKEN_ACTION, putRefreshTokenActionWithDelaySaga);
  yield takeEvery(CLEAR_TOKEN_ACTION, clearTokenSaga);
  yield takeEvery(REFRESH_TOKEN_ACTION, refreshTokenSaga);
}

export function* setTokenSaga(action) {
  const token = action.payload;
  yield call(setTokenInStorage, token);
  yield call(setAuthorizationTokenInHeaders, token);
}

export function* putRefreshTokenActionWithDelaySaga() {
  const tokenExpiryTime = yield select(selectTokenExpiryTime);
  yield call(delay, tokenExpiryTime);
  yield put(refreshTokenAction());
}

export function* clearTokenSaga() {
  yield call(removeTokenFromStorage);
}

export function* refreshTokenSaga() {
  const token = yield select(selectToken);

  if (token) {
    try {
      const response = yield call(refreshTokenApiCall, token);
      yield put(setTokenAction(response.data.token));
    } catch (error) {
      yield put(clearTokenAction(error));
    }
  }

  const hasTokenRefreshed = yield select(selectHasTokenRefreshed);

  if (!hasTokenRefreshed) {
    yield put(markTokenAsRefreshedAction());
  }
}

export function* setTokenIfExistsSaga(action) {
  const token = selectTokenFromActionPayload(action);

  if (token) {
    yield put(setTokenAction(token));
  }
}

export default [
  defaultSaga,
];
