/**
 * Test RequestPasswordResetPage sagas
 */

/* eslint-disable redux-saga/yield-effects */
import testSaga from 'redux-saga-test-plan';
import { LOCATION_CHANGE } from 'react-router-redux';
import { requestPasswordReset as requestPasswordResetApiCall } from '../../api';
import { defaultSaga, requestPasswordReset } from './sagas';
import { requestPasswordResetSucceedAction, requestPasswordResetFailedAction } from './actions';
import { REQUEST_PASSWORD_RESET_ACTION } from './constants';

const requestPasswordResetAction = {
  payload: {
    email: 'tester@ydtech.co',
  },
};

it('defaultSaga', () => {
  testSaga(defaultSaga)
    .next()
    .takeLatestFork(REQUEST_PASSWORD_RESET_ACTION, requestPasswordReset)
    .next()
    .take(LOCATION_CHANGE)
    .finish()
    .isDone();
});

it('requestPasswordReset and sign in success', () => {
  testSaga(requestPasswordReset, requestPasswordResetAction)
    .next()
    .call(requestPasswordResetApiCall, requestPasswordResetAction.payload)
    .next()
    .put(requestPasswordResetSucceedAction())
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
