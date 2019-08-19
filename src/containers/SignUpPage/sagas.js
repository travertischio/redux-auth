import {
  take,
  call,
  cancel,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { signUp as signUpApiCall } from '~/api';
import {
  failedAuthenticationResponseAction,
  successAuthenticationResponseAction,
} from '~/containers/AuthenticationProvider/actions';
import {
  signUpSuccessAction,
  signUpFailedAction,
} from './actions';
import { SIGN_UP_ACTION } from './constants';

export function* defaultSaga() {
  const signUpActionWatcher = yield takeLatest(SIGN_UP_ACTION, signUpSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(signUpActionWatcher);
}

export function* signUpSaga(action) {
  const {
    payload,
    resolve,
    reject,
  } = action;

  try {
    const response = yield call(signUpApiCall, payload);

    yield call(resolve, response);
    yield put(signUpSuccessAction(response));
    yield put(successAuthenticationResponseAction(response));
  } catch (error) {
    yield call(reject, error);
    yield put(signUpFailedAction(error));
    yield put(failedAuthenticationResponseAction(error));
  }
}

export default [
  defaultSaga,
];
