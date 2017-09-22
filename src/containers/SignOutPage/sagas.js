import {
  takeEvery,
  take,
  cancel,
  put,
  call,
} from 'redux-saga/effects';
import {
  LOCATION_CHANGE,
  push,
} from 'react-router-redux';
import { clearTokenAction } from '../AuthenticationProvider/actions';
import { signOutFailedAction } from './actions';
import { SIGN_OUT_ACTION } from './constants';
import config from '../../config';
import { signOut as signOutApiCall } from '../../api';

export function* defaultSaga() {
  const signOutActionWatcher = yield takeEvery(SIGN_OUT_ACTION, signOutSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(signOutActionWatcher);
}

export function* signOutSaga() {
  try {
    yield call(signOutApiCall);
  } catch (error) {
    yield put(signOutFailedAction());
  }

  yield put(clearTokenAction());
  yield put(push(config.redirectPathAfterSignOut));
}

export default [
  defaultSaga,
];
