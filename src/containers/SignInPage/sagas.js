import {
  call,
  cancel,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { signIn as signInApiCall } from '~/api';
import { makeSelectLastUserToken } from '~/containers/AuthenticationProvider/selectors';
import {
  failedAuthenticationResponseAction,
  successAuthenticationResponseAction,
} from '~/containers/AuthenticationProvider/actions';
import {
  signInFailedAction,
  signInSuccessAction,
} from './actions';
import { SIGN_IN_ACTION } from './constants';

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
    yield put(successAuthenticationResponseAction(response));
  } catch (error) {
    yield put(signInFailedAction(error));
    yield put(failedAuthenticationResponseAction(error));
  }
}

export default [
  watchSignInAction,
];
