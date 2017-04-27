import { take, takeLatest, takeEvery, cancel, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// TODO: move it to redux-auth
import { resetPassword as resetPasswordApiCall } from '../AuthenticationProvider/api';
import { setTokenAction } from '../AuthenticationProvider/actions';
import { selectTokenFromActionPayload } from '../AuthenticationProvider/selectors';
import { resetPasswordSucceedAction, resetPasswordFailedAction } from './actions';
import { RESET_PASSWORD_ACTION, RESET_PASSWORD_SUCCEED_ACTION } from './constants';

export function* defaultSaga() {
  const resetPasswordActionWatcher = yield takeLatest(RESET_PASSWORD_ACTION, resetPassword);
  const resetPasswordSucceedActionWatcher = yield takeEvery(RESET_PASSWORD_SUCCEED_ACTION, setTokenIfExists);

  yield take(LOCATION_CHANGE);
  yield cancel(resetPasswordActionWatcher);
  yield cancel(resetPasswordSucceedActionWatcher);
}

export function* setTokenIfExists(action) {
  const token = selectTokenFromActionPayload(action);

  if (token) {
    yield put(setTokenAction(token));
  }
}

function* resetPassword(action) {
  try {
    const response = yield call(resetPasswordApiCall, action.payload);
    yield put(resetPasswordSucceedAction(response));
  } catch (error) {
    yield put(resetPasswordFailedAction(error));
  }
}

export default [
  defaultSaga,
];
