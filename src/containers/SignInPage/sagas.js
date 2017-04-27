import { take, takeLatest, takeEvery, call, cancel, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { signIn as signInApiCall } from '../AuthenticationProvider/api';
import { setTokenAction } from '../AuthenticationProvider/actions';
import { selectTokenFromActionPayload } from '../AuthenticationProvider/selectors';
import { signInSucceedAction, signInFailedAction } from './actions';
import { SIGN_IN_ACTION, SIGN_IN_SUCCEED_ACTION } from './constants';

export function* defaultSaga() {
  const signInActionWatcher = yield takeLatest(SIGN_IN_ACTION, signIn);
  const signInSucceedActionWatcher = yield takeEvery(SIGN_IN_SUCCEED_ACTION, setToken);

  yield take(LOCATION_CHANGE);
  yield cancel(signInActionWatcher);
  yield cancel(signInSucceedActionWatcher);
}

export function* setToken(action) {
  const token = selectTokenFromActionPayload(action);
  yield put(setTokenAction(token));
}

export function* signIn(action) {
  try {
    const response = yield call(signInApiCall, action.payload);
    yield put(signInSucceedAction(response));
  } catch (error) {
    yield put(signInFailedAction(error));
  }
}

export default [
  defaultSaga,
];
