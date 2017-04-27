import { take, takeLatest, takeEvery, call, cancel, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// TODO: move it to redux-auth
import { signUp as signUpAPICall } from '../AuthenticationProvider/api';
import { setTokenAction } from '../AuthenticationProvider/actions';
import { selectTokenFromActionPayload } from '../AuthenticationProvider/selectors';
import {
  signUpSucceedAction,
  signUpFailedAction,
} from './actions';
import {
  SIGN_UP_ACTION,
  SIGN_UP_SUCCEED_ACTION,
} from './constants';

export function* defaultSaga() {
  // TODO find out if we should use takeLatest in both watchers
  const signUpActionWatcher = yield takeLatest(SIGN_UP_ACTION, signUp);
  const signUpSucceedActionWatcher = yield takeEvery(SIGN_UP_SUCCEED_ACTION, setTokenIfExists);

  yield take(LOCATION_CHANGE);
  yield cancel(signUpActionWatcher);
  yield cancel(signUpSucceedActionWatcher);
}

export function* signUp(action) {
  try {
    const response = yield call(signUpAPICall, action.payload);

    yield put(signUpSucceedAction(response));
  } catch (error) {
    yield put(signUpFailedAction(error));
  }
}

// TODO move it to AuthenticationProvider
export function* setTokenIfExists(action) {
  const token = selectTokenFromActionPayload(action);

  if (token) {
    yield put(setTokenAction(token));
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
