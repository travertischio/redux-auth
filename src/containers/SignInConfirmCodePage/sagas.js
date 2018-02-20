import {
  takeLatest,
  take,
  call,
  cancel,
  put,
  select,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { twoFactorConfirmCode as twoFactorConfirmCodeApiCall } from '~/api';
import { selectToken } from '~/containers/AuthenticationProvider/selectors';
import {
  failedAuthenticationResponseAction,
  successAuthenticationResponseAction,
} from '~/containers/AuthenticationProvider/actions';
import {
  confirmCodeSuccessAction,
  confirmCodeFailedAction,
} from './actions';
import { CONFIRM_CODE_ACTION } from './constants';

export function* watchConfirmCodeAction() {
  const confirmCodeActionWatcher = yield takeLatest(CONFIRM_CODE_ACTION, confirmCodeSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(confirmCodeActionWatcher);
}

export function* confirmCodeSaga(action) {
  try {
    const token = yield select(selectToken);
    const code = action.payload.get('code');

    const response = yield call(twoFactorConfirmCodeApiCall, token, code);

    yield put(confirmCodeSuccessAction(response));
    yield put(successAuthenticationResponseAction(response));
    yield call(action.resolve, response);
  } catch (error) {
    yield put(confirmCodeFailedAction(error));
    yield put(failedAuthenticationResponseAction(error));
    yield call(action.reject, error);
  }
}

export default [
  watchConfirmCodeAction,
];
