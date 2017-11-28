import { delay } from 'redux-saga';
import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  setAuthDataInStorage,
  removeAuthDataFromStorage,
  tokenIsAwaitingSecondFactor,
  tokenIsValid,
} from './utils';
import {
  clearTokenDataAction,
  markAuthenticationProviderAsReadyAction,
  extendTokenLifetimeAction,
  setTokenDataAction,
  setUserDataAction,
  twoFactorSendCodeAction,
  twoFactorSendCodeSuccessAction,
  twoFactorSendCodeFailedAction,
  signOutFailedAction,
  signOutSuccessAction,
  clearUserDataAction,
} from './actions';
import {
  selectToken,
  selectTokenExpireInMs,
  selectTokenIsExpired,
  selectIsReady,
  selectTokenDataFromActionPayload,
  selectUserDataFromActionPayload,
} from './selectors';
import {
  extendTokenLifetime as extendTokenLifetimeApiCall,
  twoFactorSendCode as twoFactorSendCodeApiCall,
  signOut as signOutApiCall,
  setAuthorizationTokenInHeaders,
  removeAuthorizationTokenInHeaders,
} from '../../api';
import {
  EXTEND_TOKEN_LIFETIME_ACTION,
  SET_TOKEN_DATA_ACTION,
  CLEAR_TOKEN_DATA_ACTION,
  TWO_FACTOR_SEND_CODE_ACTION,
  SIGN_OUT_ACTION,
} from './constants';
import config from '../../config';

export function* watchSetTokenDataAction() {
  yield takeEvery(SET_TOKEN_DATA_ACTION, setTokenDataSaga);
  yield takeEvery(SET_TOKEN_DATA_ACTION, putExtendTokenLifetimeActionWithDelaySaga);
}

export function* watchTwoFactorSendCodeAction() {
  yield takeEvery(TWO_FACTOR_SEND_CODE_ACTION, twoFactorSendCodeSaga);
}

export function* watchClearTokenDataAction() {
  yield takeEvery(CLEAR_TOKEN_DATA_ACTION, clearTokenSaga);
}

export function* watchExtendTokenLifetimeAction() {
  yield takeEvery(EXTEND_TOKEN_LIFETIME_ACTION, extendTokenLifetimeSaga);
}

export function* setTokenDataSaga(action) {
  const tokenData = action.tokenData;

  yield call(setAuthDataInStorage, { tokenData });

  if (tokenIsValid(tokenData)) {
    yield call(setAuthorizationTokenInHeaders, tokenData.key);
  }
}

export function* putExtendTokenLifetimeActionWithDelaySaga(action) {
  if (tokenIsValid(action.tokenData)) {
    const tokenExpireInMs = yield select(selectTokenExpireInMs);

    yield call(delay, tokenExpireInMs);
    yield put(extendTokenLifetimeAction());
  }
}

export function* clearTokenSaga() {
  yield call(removeAuthDataFromStorage);
  yield call(removeAuthorizationTokenInHeaders);
}

export function* extendTokenLifetimeSaga() {
  const token = yield select(selectToken);

  if (token) {
    try {
      const response = yield call(extendTokenLifetime, token);
      const action = {
        payload: response,
      };

      yield call(handleAuthenticationSaga, action);
    } catch (error) {
      yield put(clearTokenDataAction());
    }

    yield call(markAuthenticationProviderAsReady);
  } else {
    yield call(markAuthenticationProviderAsReady);
  }
}

function* markAuthenticationProviderAsReady() {
  const authenticationProviderIsReady = yield select(selectIsReady);

  if (!authenticationProviderIsReady) {
    yield put(markAuthenticationProviderAsReadyAction());
  }
}

function* extendTokenLifetime(token) {
  let tokenIsExpired;

  do {
    try {
      const response = yield call(extendTokenLifetimeApiCall, token);

      return response;
    } catch (error) {
      if (!isNoInternetConnectionError(error) && !isServerError(error)) {
        break;
      }
    }

    yield call(delay, 5000);
    tokenIsExpired = yield select(selectTokenIsExpired);
  } while (!tokenIsExpired);

  throw new Error('Token expired');
}

function isNoInternetConnectionError(error) {
  return !error.response;
}

function isServerError(error) {
  const status = error.response && error.response.status;

  return status >= 500;
}

export function* handleAuthenticationSaga(action) {
  const tokenData = selectTokenDataFromActionPayload(action);
  const userData = selectUserDataFromActionPayload(action);

  if (tokenData) {
    yield put(setTokenDataAction(tokenData));

    if (tokenIsAwaitingSecondFactor(tokenData)) {
      yield put(twoFactorSendCodeAction(tokenData.key));
      yield put(push(config.signInConfirmCodePageUrl));
    }
  }

  if (userData) {
    yield put(setUserDataAction(userData));
  }
}

export function* twoFactorSendCodeSaga(action) {
  try {
    yield call(twoFactorSendCodeApiCall, action.token);
    yield put(twoFactorSendCodeSuccessAction());
  } catch (error) {
    yield put(twoFactorSendCodeFailedAction(error));
  }
}

export function* watchSignOutAction() {
  yield takeEvery(SIGN_OUT_ACTION, signOutSaga);
}

export function* signOutSaga() {
  try {
    yield call(signOutApiCall);
    yield put(signOutSuccessAction());
  } catch (error) {
    yield put(signOutFailedAction());
  }

  yield put(clearTokenDataAction());
  yield put(clearUserDataAction());
}

export default [
  watchClearTokenDataAction,
  watchExtendTokenLifetimeAction,
  watchSetTokenDataAction,
  watchSignOutAction,
  watchTwoFactorSendCodeAction,
];
