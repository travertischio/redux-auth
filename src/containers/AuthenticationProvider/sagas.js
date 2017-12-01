import { delay } from 'redux-saga';
import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  isNoInternetConnectionError,
  isServerError,
  removeAuthDataFromStorage,
  setAuthDataInStorage,
  tokenIsAwaitingSecondFactor,
  tokenIsValid,
} from './utils';
import {
  clearTokenDataAction,
  clearUserDataAction,
  extendTokenLifetimeAction,
  markAuthenticationProviderAsReadyAction,
  markTokenAsInvalidAction,
  setTokenDataAction,
  setUserDataAction,
  signOutFailedAction,
  signOutSuccessAction,
  twoFactorSendCodeAction,
  twoFactorSendCodeFailedAction,
  twoFactorSendCodeSuccessAction,
} from './actions';
import {
  selectIsReady,
  selectTokeIsValid,
  selectToken,
  selectTokenDataAsInvalid,
  selectTokenDataFromActionPayload,
  selectTokenExpireInMs,
  selectTokenIsExpired,
  selectUserDataFromActionPayload,
} from './selectors';
import {
  extendTokenLifetime as extendTokenLifetimeApiCall,
  removeAuthorizationTokenInHeaders,
  setAuthorizationTokenInHeaders,
  signOut as signOutApiCall,
  twoFactorSendCode as twoFactorSendCodeApiCall,
} from '../../api';
import {
  CLEAR_TOKEN_DATA_ACTION,
  EXTEND_TOKEN_LIFETIME_ACTION,
  MARK_TOKEN_AS_INVALID_ACTION,
  SET_TOKEN_DATA_ACTION,
  SIGN_OUT_ACTION,
  TWO_FACTOR_SEND_CODE_ACTION,
} from './constants';
import config from '../../config';

export function* watchClearTokenDataAction() {
  yield takeEvery(CLEAR_TOKEN_DATA_ACTION, clearTokenSaga);
}

export function* clearTokenSaga() {
  yield call(removeAuthDataFromStorage);
  yield call(removeAuthorizationTokenInHeaders);
}

export function* watchExtendTokenLifetimeAction() {
  yield takeEvery(EXTEND_TOKEN_LIFETIME_ACTION, extendTokenLifetimeSaga);
}

export function* extendTokenLifetimeSaga() {
  const token = yield select(selectToken);
  const tokeIsValid = yield select(selectTokeIsValid);

  if (token && tokeIsValid) {
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

export function* watchMarkTokenAsInvalidAction() {
  yield takeEvery(MARK_TOKEN_AS_INVALID_ACTION, markTokenAsInvalidSaga);
}

export function* markTokenAsInvalidSaga() {
  const tokenData = yield select(selectTokenDataAsInvalid);

  yield put(setTokenDataAction(tokenData));
}

export function* watchSetTokenDataAction() {
  yield takeEvery(SET_TOKEN_DATA_ACTION, setTokenDataSaga);
  yield takeEvery(SET_TOKEN_DATA_ACTION, putExtendTokenLifetimeActionWithDelaySaga);
}

export function* putExtendTokenLifetimeActionWithDelaySaga(action) {
  if (tokenIsValid(action.tokenData)) {
    const tokenExpireInMs = yield select(selectTokenExpireInMs);

    yield call(delay, tokenExpireInMs);
    yield put(extendTokenLifetimeAction());
  }
}

export function* setTokenDataSaga(action) {
  const tokenData = action.tokenData;

  yield call(setAuthDataInStorage, { tokenData });

  if (tokenIsValid(tokenData)) {
    yield call(setAuthorizationTokenInHeaders, tokenData.key);
  } else {
    yield call(removeAuthorizationTokenInHeaders);
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

  yield put(markTokenAsInvalidAction());
  yield put(clearUserDataAction());
}

export function* watchTwoFactorSendCodeAction() {
  yield takeEvery(TWO_FACTOR_SEND_CODE_ACTION, twoFactorSendCodeSaga);
}

export function* twoFactorSendCodeSaga(action) {
  try {
    yield call(twoFactorSendCodeApiCall, action.token);
    yield put(twoFactorSendCodeSuccessAction());
  } catch (error) {
    yield put(twoFactorSendCodeFailedAction(error));
  }
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

export default [
  watchClearTokenDataAction,
  watchExtendTokenLifetimeAction,
  watchMarkTokenAsInvalidAction,
  watchSetTokenDataAction,
  watchSignOutAction,
  watchTwoFactorSendCodeAction,
];
