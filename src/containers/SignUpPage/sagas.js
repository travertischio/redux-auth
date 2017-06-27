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
import { LOCATION_CHANGE } from 'react-router-redux';
import { signUp as signUpApiCall } from '../../api';
import { setTokenIfExistsSaga } from '../AuthenticationProvider/sagas';
import {
  signUpSuccessAction,
  signUpFailedAction,
} from './actions';
import {
  SIGN_UP_ACTION,
  SIGN_UP_SUCCESS_ACTION,
} from './constants';

export function* defaultSaga() {
  const signUpActionWatcher = yield takeLatest(SIGN_UP_ACTION, signUpSaga);
  const signUpSuccessActionWatcher = yield takeEvery(SIGN_UP_SUCCESS_ACTION, setTokenIfExistsSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(signUpActionWatcher);
  yield cancel(signUpSuccessActionWatcher);
}

export function* signUpSaga(action) {
  try {
    const response = yield call(signUpApiCall, action.payload);

    yield put(signUpSuccessAction(response));
  } catch (error) {
    yield put(signUpFailedAction(error));
  }
}

export default [
  defaultSaga,
];
