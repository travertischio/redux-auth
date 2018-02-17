import {
  takeLatest,
  takeEvery,
  take,
  call,
  cancel,
  put,
  select,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { twoFactorConfirmCode as twoFactorConfirmCodeApiCall } from '~/api';
import { selectToken } from '~/containers/AuthenticationProvider/selectors';
import { handleAuthenticationSaga } from '~/containers/AuthenticationProvider/sagas';
import {
  confirmCodeSuccessAction,
  confirmCodeFailedAction,
} from './actions';
import {
  CONFIRM_CODE_ACTION,
  CONFIRM_CODE_SUCCESS_ACTION,
} from './constants';

export function* watchConfirmCodeAction() {
  const confirmCodeActionWatcher = yield takeLatest(CONFIRM_CODE_ACTION, confirmCodeSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(confirmCodeActionWatcher);
}

export function* watchConfirmCodeSuccessAction() {
  const signInSuccessActionWatcher = yield takeEvery(CONFIRM_CODE_SUCCESS_ACTION, handleAuthenticationSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(signInSuccessActionWatcher);
}

export function* confirmCodeSaga(action) {
  try {
    const token = yield select(selectToken);
    const code = action.payload.get('code');

    const response = yield call(twoFactorConfirmCodeApiCall, token, code);

    yield put(confirmCodeSuccessAction(response));
    yield call(action.resolve, response);
  } catch (error) {
    yield put(confirmCodeFailedAction(error));
    yield call(action.reject, error);
  }
}

export default [
  watchConfirmCodeAction,
  watchConfirmCodeSuccessAction,
];
