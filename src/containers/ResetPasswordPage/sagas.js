import { takeLatest, takeEvery } from 'redux-saga';
import { take, cancel, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// TODO: move it to redux-auth
import { resetPassword as resetPasswordApiCall } from '../../api';
import { setTokenIfExistsSaga } from '../AuthenticationProvider/sagas';
import { resetPasswordSucceedAction, resetPasswordFailedAction } from './actions';
import { RESET_PASSWORD_ACTION, RESET_PASSWORD_SUCCEED_ACTION } from './constants';

export function* defaultSaga() {
  const resetPasswordActionWatcher = yield takeLatest(RESET_PASSWORD_ACTION, resetPasswordSaga);
  const resetPasswordSucceedActionWatcher = yield takeEvery(RESET_PASSWORD_SUCCEED_ACTION, setTokenIfExistsSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(resetPasswordActionWatcher);
  yield cancel(resetPasswordSucceedActionWatcher);
}

export function* resetPasswordSaga(action) {
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