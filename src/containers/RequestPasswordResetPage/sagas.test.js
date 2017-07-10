/**
 * Test RequestPasswordResetPage sagas
 */

import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE } from 'react-router-redux';
import { requestPasswordReset as requestPasswordResetApiCall } from '../../api';
import { defaultSaga, requestPasswordReset } from './sagas';
import { requestPasswordResetSuccessAction, requestPasswordResetFailedAction } from './actions';
import { REQUEST_PASSWORD_RESET_ACTION } from './constants';

const requestPasswordResetAction = {
  payload: {
    email: 'tester@test.com',
  },
};

it('defaultSaga', () => {
  const task1 = createMockTask();

  testSaga(defaultSaga)
    .next()
    .takeLatestEffect(REQUEST_PASSWORD_RESET_ACTION, requestPasswordReset)
    .next(task1)
    .take(LOCATION_CHANGE)
    .next()
    .cancel(task1)
    .finish()
    .isDone();
});

it('requestPasswordReset and sign in success', () => {
  testSaga(requestPasswordReset, requestPasswordResetAction)
    .next()
    .call(requestPasswordResetApiCall, requestPasswordResetAction.payload)
    .next()
    .put(requestPasswordResetSuccessAction())
    .finish()
    .isDone();
});

it('requestPasswordReset and sign in failed', () => {
  const errorResponse = {
    non_field_errors: ['Not found.'],
  };

  testSaga(requestPasswordReset, requestPasswordResetAction)
    .next()
    .call(requestPasswordResetApiCall, requestPasswordResetAction.payload)
    .throw(errorResponse)
    .put(requestPasswordResetFailedAction(errorResponse))
    .finish()
    .isDone();
});
