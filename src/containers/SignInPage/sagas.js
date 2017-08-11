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
import {
  setTokenAction,
  setPermanentTokenAndDeviceIdAction,
} from '../AuthenticationProvider/actions';
import {
  selectTokenFromActionPayload,
  selectPermanentTokenAndDeviceIdFromActionPayload,
} from '../AuthenticationProvider/selectors';
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
  const signInSuccessActionWatcher = yield takeEvery(SIGN_IN_SUCCESS_ACTION, onSignInSuccessSaga);

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

export function* onSignInSuccessSaga(action) {
  const token = selectTokenFromActionPayload(action);
  const payload = selectPermanentTokenAndDeviceIdFromActionPayload(action);

  yield put(setTokenAction(token));
  yield put(setPermanentTokenAndDeviceIdAction(payload));
}

export default [
  defaultSaga,
];
