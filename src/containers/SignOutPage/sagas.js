import {
  call,
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
  clearTokenDataAction,
  clearUserDataAction,
} from '../AuthenticationProvider/actions';
import { signOutFailedAction } from './actions';
import { SIGN_OUT_ACTION } from './constants';
import { signOut as signOutApiCall } from '../../api';
import config from '../../config';

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

  yield put(clearTokenDataAction());
  yield put(clearUserDataAction());
  yield put(push(config.redirectPathAfterSignOut));
}

export default [
  defaultSaga,
];
