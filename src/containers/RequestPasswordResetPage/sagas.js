import { takeLatest, take, cancel, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { requestPasswordReset as requestPasswordResetApiCall } from '../AuthenticationProvider/api';
import { requestPasswordResetSucceedAction, requestPasswordResetFailedAction } from './actions';
import { REQUEST_PASSWORD_RESET_ACTION } from './constants';

export function* defaultSaga() {
  const RequestPasswordResetActionWatcher = yield takeLatest(REQUEST_PASSWORD_RESET_ACTION, requestPasswordReset);

  yield take(LOCATION_CHANGE);
  yield cancel(RequestPasswordResetActionWatcher);
}

function* requestPasswordReset(action) {
  try {
    const response = yield call(requestPasswordResetApiCall, action.payload);
    yield put(requestPasswordResetSucceedAction(response));
  } catch (error) {
    yield put(requestPasswordResetFailedAction(error));
  }
}

export default [
  defaultSaga,
];
