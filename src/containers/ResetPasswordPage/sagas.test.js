/**
 * Test ResetPasswordPage sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE } from 'react-router-redux';
import { handleAuthenticationSaga } from '../AuthenticationProvider/sagas';
import { resetPassword as resetPasswordApiCall } from '../../api';
import { defaultSaga, resetPasswordSaga } from './sagas';
import { resetPasswordSuccessAction, resetPasswordFailedAction } from './actions';
import { RESET_PASSWORD_ACTION, RESET_PASSWORD_SUCCESS_ACTION } from './constants';

const resetPasswordaAction = {
  payload: {
    email: 'new-tester@test.com',
  },
};

it('defaultSaga', () => {
  const task1 = createMockTask();
  const task2 = createMockTask();

  testSaga(defaultSaga)
    .next()
    .takeLatestEffect(RESET_PASSWORD_ACTION, resetPasswordSaga)
    .next(task1)
    .takeEveryEffect(RESET_PASSWORD_SUCCESS_ACTION, handleAuthenticationSaga)
    .next(task2)
    .take(LOCATION_CHANGE)
    .next()
    .cancel(task1)
    .next()
    .cancel(task2)
    .finish()
    .isDone();
});

it('resetPasswordSaga and succeed', () => {
  testSaga(resetPasswordSaga, resetPasswordaAction)
    .next()
    .call(resetPasswordApiCall, resetPasswordaAction.payload)
    .next()
    .put(resetPasswordSuccessAction())
    .finish()
    .isDone();
});

it('resetPasswordSaga and failed', () => {
  const errorResponse = {
    non_field_errors: ['Password do not match.'],
  };

  testSaga(resetPasswordSaga, resetPasswordaAction)
    .next()
    .call(resetPasswordApiCall, resetPasswordaAction.payload)
    .throw(errorResponse)
    .put(resetPasswordFailedAction(errorResponse))
    .finish()
    .isDone();
});
