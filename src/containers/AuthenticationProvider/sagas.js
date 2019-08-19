import {
  call,
  delay,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  extendTokenLifetime as extendTokenLifetimeApiCall,
  removeAuthorizationTokenInHeaders,
  setAuthorizationTokenInHeaders,
  signOut as signOutApiCall,
  twoFactorSendCode as twoFactorSendCodeApiCall,
} from '~/api';
import config from '~/config';
import {
  isNoInternetConnectionError,
  isServerError,
  removeAuthDataFromStorage,
  setAuthDataInStorage,
  tokenIsAwaitingSecondFactor,
  tokenIsValid,
  storeLastUserToken,
  generateLastUserTokenKey,
} from './utils';
import {
  blockedAccountAction,
  clearUserDataAction,
  extendTokenLifetimeAction,
  markAuthenticationProviderAsReadyAction,
  markTokenAsInvalidAction,
  requireCaptchaAction,
  setLastUserTokenAction,
  setTokenDataAction,
  setUserDataAction,
  signOutFailedAction,
  signOutSuccessAction,
  successAuthenticationResponseAction,
  twoFactorSendCodeAction,
  twoFactorSendCodeFailedAction,
  twoFactorSendCodeSuccessAction,
} from './actions';
import {
  selectIsReady,
  selectTokeIsValid,
  selectToken,
  selectTokenDataAsInvalid,
  selectExtendTokenWithinMs,
  selectTokenIsExpired,
} from './selectors';
import {
  CLEAR_TOKEN_DATA_ACTION,
  EXTEND_TOKEN_LIFETIME_ACTION,
  FAILED_AUTHENTICATION_RESPONSE_ACTION,
  MARK_TOKEN_AS_INVALID_ACTION,
  SET_LAST_USER_TOKEN,
  SET_TOKEN_DATA_ACTION,
  SIGN_OUT_ACTION,
  SUCCESS_AUTHENTICATION_RESPONSE_ACTION,
  TWO_FACTOR_SEND_CODE_ACTION,
} from './constants';

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
      yield put(successAuthenticationResponseAction(response));
    } catch (error) {
      yield put(markTokenAsInvalidAction());
      yield put(clearUserDataAction());
      yield call(markAuthenticationProviderAsReady);
    }
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
    const extendTokenWithinMs = yield select(selectExtendTokenWithinMs);

    yield delay(extendTokenWithinMs);
    yield put(extendTokenLifetimeAction());
  }
}

export function* setTokenDataSaga(action) {
  const { tokenData } = action;

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

export function* watchLastUserTokenAction() {
  yield takeEvery(SET_LAST_USER_TOKEN, lastUserTokenSaga);
}

export function* lastUserTokenSaga(action) {
  const {
    key,
    token,
  } = action;

  yield call(storeLastUserToken, key, token);
}

export function* watchSuccessAuthenticationResponseAction() {
  yield takeEvery(SUCCESS_AUTHENTICATION_RESPONSE_ACTION, onSuccessAuthenticationResponseAction);
}

export function* watchFailedAuthenticationResponseAction() {
  yield takeEvery(FAILED_AUTHENTICATION_RESPONSE_ACTION, onFailedAuthenticationResponseAction);
}

export function* onSuccessAuthenticationResponseAction(action) {
  const successAuthenticationResponseSaga = config.successAuthenticationResponseSaga || defaultSuccessAuthenticationResponseSaga;

  yield* successAuthenticationResponseSaga(action);
}

export function* onFailedAuthenticationResponseAction(action) {
  const failedAuthenticationResponseSaga = config.failedAuthenticationResponseSaga || defaultFailedAuthenticationResponseSaga;

  yield* failedAuthenticationResponseSaga(action);
}

export function* defaultSuccessAuthenticationResponseSaga(action) {
  const {
    response: {
      data: {
        tokenData,
        userData,
      },
    },
  } = action;

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

  if (tokenData && userData) {
    const lastUserTokenKey = generateLastUserTokenKey(userData.email);

    yield put(setLastUserTokenAction(lastUserTokenKey, tokenData.key));
  }

  yield call(markAuthenticationProviderAsReady);
}

export function* defaultFailedAuthenticationResponseSaga(action) {
  const {
    error: {
      response: {
        data: {
          captcha,
          userBlocked,
        },
      },
    },
  } = action;

  if (captcha) {
    yield put(requireCaptchaAction());
  }

  if (userBlocked) {
    yield put(blockedAccountAction());
  }

  yield true;
}

export default [
  watchClearTokenDataAction,
  watchExtendTokenLifetimeAction,
  watchFailedAuthenticationResponseAction,
  watchLastUserTokenAction,
  watchMarkTokenAsInvalidAction,
  watchSetTokenDataAction,
  watchSignOutAction,
  watchSuccessAuthenticationResponseAction,
  watchTwoFactorSendCodeAction,
];
