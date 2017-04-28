import { takeEvery } from 'redux-saga';
import { take, cancel, put } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { clearTokenAction } from '../AuthenticationProvider/actions';
import { SIGN_OUT_ACTION } from './constants';

export function* defaultSaga() {
  const signOutActionWatcher = yield takeEvery(SIGN_OUT_ACTION, signOutSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(signOutActionWatcher);
}

export function* signOutSaga() {
  yield put(clearTokenAction());
  yield put(push('/'));
}

export default [
  defaultSaga,
  signOutSaga,
];
