import {
  takeLatest,
  take,
  cancel,
  put,
  call,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { resetPassword as resetPasswordApiCall } from '~/api';
import {
  failedAuthenticationResponseAction,
  successAuthenticationResponseAction,
} from '~/containers/AuthenticationProvider/actions';
import {
  resetPasswordSuccessAction,
  resetPasswordFailedAction,
} from './actions';
import { RESET_PASSWORD_ACTION } from './constants';

export function* defaultSaga() {
  const resetPasswordActionWatcher = yield takeLatest(RESET_PASSWORD_ACTION, resetPasswordSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(resetPasswordActionWatcher);
}

export function* resetPasswordSaga(action) {
  try {
    const response = yield call(resetPasswordApiCall, action.payload);
    yield put(resetPasswordSuccessAction(response));
    yield put(successAuthenticationResponseAction(response));
  } catch (error) {
    yield put(resetPasswordFailedAction(error));
    yield put(failedAuthenticationResponseAction(error));
  }
}

export default [
  defaultSaga,
];
