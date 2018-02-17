import {
  call,
  cancel,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { signIn as signInApiCall } from '~/api';
import { handleAuthenticationSaga } from '~/containers/AuthenticationProvider/sagas';
import { makeSelectLastUserToken } from '~/containers/AuthenticationProvider/selectors';
import {
  signInFailedAction,
  signInSuccessAction,
} from './actions';
import {
  SIGN_IN_ACTION,
  SIGN_IN_SUCCESS_ACTION,
} from './constants';

export function* watchSignInAction() {
  const signInActionWatcher = yield takeLatest(SIGN_IN_ACTION, signInSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(signInActionWatcher);
}

export function* signInSaga(action) {
  try {
    const selectLastUserToken = yield call(makeSelectLastUserToken, action.credentials.get('email'));
    const lastToken = yield select(selectLastUserToken);
    const credentials = {
      token: lastToken,
      ...action.credentials.toJS(),
    };

    const response = yield call(signInApiCall, credentials);

    yield put(signInSuccessAction(response));
  } catch (error) {
    yield put(signInFailedAction(error));
  }
}

export function* watchSignInSuccessAction() {
  const signInSuccessActionWatcher = yield takeEvery(SIGN_IN_SUCCESS_ACTION, handleAuthenticationSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(signInSuccessActionWatcher);
}

export default [
  watchSignInAction,
  watchSignInSuccessAction,
];
