import {
  takeLatest,
  takeEvery,
  take,
  call,
  cancel,
  put,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { signIn as signInApiCall } from '../../api';
import { handleAuthenticationSaga } from '../AuthenticationProvider/sagas';
import {
  signInSuccessAction,
  signInFailedAction,
} from './actions';
import {
  SIGN_IN_ACTION,
  SIGN_IN_SUCCESS_ACTION,
} from './constants';

export function* defaultSaga() {
  const signInActionWatcher = yield takeLatest(SIGN_IN_ACTION, signInSaga);

  const signInSuccessActionWatcher = yield takeEvery(SIGN_IN_SUCCESS_ACTION, handleAuthenticationSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(signInActionWatcher);
  yield cancel(signInSuccessActionWatcher);
}

export function* signInSaga(action) {
  try {
    const response = yield call(signInApiCall, action.payload);

    yield put(signInSuccessAction(response));
  } catch (error) {
    yield put(signInFailedAction(error));
  }
}

export default [
  defaultSaga,
];
