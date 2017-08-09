import { delay } from 'redux-saga';
import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import {
  setAuthDataInStorage,
  removeAuthDataFromStorage,
} from './utils';
import {
  setTokenAction,
  clearTokenAction,
  refreshTokenAction,
  markTokenAsRefreshedAction,
} from './actions';
import {
  selectPermanentToken,
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
  SET_PERMANENT_TOKEN_AND_DEVICE_ID_ACTION,
  CLEAR_TOKEN_ACTION,
} from './constants';

export function* watchSetTokenAction() {
  yield takeEvery(SET_TOKEN_ACTION, setTokenSaga);
  yield takeEvery(SET_TOKEN_ACTION, putRefreshTokenActionWithDelaySaga);
}

export function* watchSetPermanentTokenAndDeviceIdAction() {
  yield takeEvery(SET_PERMANENT_TOKEN_AND_DEVICE_ID_ACTION, setPermanentTokenAndDeviceIdSaga);
}

export function* watchClearTokenAction() {
  yield takeEvery(CLEAR_TOKEN_ACTION, clearTokenSaga);
}

export function* watchRefreshTokenAction() {
  yield takeEvery(REFRESH_TOKEN_ACTION, refreshTokenSaga);
}

export function* setTokenSaga(action) {
  const token = action.payload;

  yield call(setAuthDataInStorage, { token });
  yield call(setAuthorizationTokenInHeaders, token);
}

export function* setPermanentTokenAndDeviceIdSaga(action) {
  const {
    permanentToken,
    deviceId,
  } = action.payload;

  yield call(setAuthDataInStorage, {
    permanentToken,
    deviceId,
  });
}

export function* putRefreshTokenActionWithDelaySaga() {
  const tokenExpiryTime = yield select(selectTokenExpiryTime);

  yield call(delay, tokenExpiryTime);
  yield put(refreshTokenAction());
}

export function* clearTokenSaga() {
  yield call(removeAuthDataFromStorage);
}

export function* refreshTokenSaga() {
  const permanentToken = yield select(selectPermanentToken);

  if (permanentToken) {
    try {
      const response = yield call(refreshTokenApiCall, permanentToken);
      yield put(setTokenAction(response.data.token));
    } catch (error) {
      yield put(clearTokenAction());
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
  watchSetTokenAction,
  watchSetPermanentTokenAndDeviceIdAction,
  watchClearTokenAction,
  watchRefreshTokenAction,
];
