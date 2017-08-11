import {
  call,
  cancel,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import {
  LOCATION_CHANGE,
  push,
} from 'react-router-redux';
import { clearTokenAction } from '../AuthenticationProvider/actions';
import { selectDeviceId } from '../AuthenticationProvider/selectors';
import { SIGN_OUT_ACTION } from './constants';
import { signOut as signOutApiCall } from '../../api';
import config from '../../config';

export function* defaultSaga() {
  const signOutActionWatcher = yield takeEvery(SIGN_OUT_ACTION, signOutSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(signOutActionWatcher);
}

export function* signOutSaga() {
  const deviceId = yield select(selectDeviceId);

  if (deviceId) {
    yield call(signOutApiCall, deviceId);
  }

  yield put(clearTokenAction());
  yield put(push(config.redirectPathAfterSignOut));
}

export default [
  defaultSaga,
];
