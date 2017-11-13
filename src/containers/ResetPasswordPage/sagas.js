import {
  takeLatest,
  takeEvery,
  take,
  cancel,
  put,
  call,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { resetPassword as resetPasswordApiCall } from '../../api';
import { handleAuthenticationSaga } from '../AuthenticationProvider/sagas';
import {
  resetPasswordSuccessAction,
  resetPasswordFailedAction,
} from './actions';
import {
  RESET_PASSWORD_ACTION,
  RESET_PASSWORD_SUCCESS_ACTION,
} from './constants';

export function* defaultSaga() {
  const resetPasswordActionWatcher = yield takeLatest(RESET_PASSWORD_ACTION, resetPasswordSaga);
  const resetPasswordSuccessActionWatcher = yield takeEvery(RESET_PASSWORD_SUCCESS_ACTION, handleAuthenticationSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(resetPasswordActionWatcher);
  yield cancel(resetPasswordSuccessActionWatcher);
}

export function* resetPasswordSaga(action) {
  try {
    const response = yield call(resetPasswordApiCall, action.payload);
    yield put(resetPasswordSuccessAction(response));
  } catch (error) {
    yield put(resetPasswordFailedAction(error));
  }
}

export default [
  defaultSaga,
];
