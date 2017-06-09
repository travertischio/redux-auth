import {
  takeLatest,
  takeEvery,
} from 'redux-saga';
import {
  take,
  call,
  cancel,
  put,
} from 'redux-saga/effects';
import {
  LOCATION_CHANGE,
  push,
} from 'react-router-redux';
import { signIn as signInApiCall } from '../../api';
import { setTokenAction } from '../AuthenticationProvider/actions';
import { selectTokenFromActionPayload } from '../AuthenticationProvider/selectors';
import {
  signInSuccessAction,
  signInFailedAction,
} from './actions';
import {
  SIGN_IN_ACTION,
  SIGN_IN_SUCCESS_ACTION,
} from './constants';
import config from '../../config';

export function* defaultSaga() {
  const signInActionWatcher = yield takeLatest(SIGN_IN_ACTION, signInSaga);
  const signInSuccessActionWatcher = yield takeEvery(SIGN_IN_SUCCESS_ACTION, setTokenSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(signInActionWatcher);
  yield cancel(signInSuccessActionWatcher);
}

export function* signInSaga(action) {
  try {
    const response = yield call(signInApiCall, action.payload);

    yield put(signInSuccessAction(response));
    yield put(push(config.redirectPathAfterSignIn));
  } catch (error) {
    yield put(signInFailedAction(error));
  }
}

export function* setTokenSaga(action) {
  const token = selectTokenFromActionPayload(action);
  yield put(setTokenAction(token));
}

export default [
  defaultSaga,
];
