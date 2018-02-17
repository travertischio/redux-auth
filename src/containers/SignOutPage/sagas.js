import {
  cancel,
  put,
  take,
  takeEvery,
} from 'redux-saga/effects';
import {
  LOCATION_CHANGE,
  push,
} from 'react-router-redux';
import {
  SIGN_OUT_SUCCESS_ACTION,
  SIGN_OUT_FAILED_ACTION,
} from '~/containers/AuthenticationProvider/constants';
import config from '~/config';

export function* defaultSaga() {
  const signOutSuccessActionWatcher = yield takeEvery(SIGN_OUT_SUCCESS_ACTION, signOutSaga);
  const signOutFailedActionWatcher = yield takeEvery(SIGN_OUT_FAILED_ACTION, signOutSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(signOutSuccessActionWatcher);
  yield cancel(signOutFailedActionWatcher);
}

export function* signOutSaga() {
  yield put(push(config.redirectPathAfterSignOut));
}

export default [
  defaultSaga,
];
