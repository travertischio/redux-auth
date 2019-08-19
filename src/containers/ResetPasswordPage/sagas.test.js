/**
 * Test ResetPasswordPage sagas
 */

import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from '@redux-saga/testing-utils';
import { LOCATION_CHANGE } from 'react-router-redux';
import { resetPassword as resetPasswordApiCall } from '~/api';
import { tokenAndUserData } from '~/test.data';
import {
  failedAuthenticationResponseAction,
  successAuthenticationResponseAction,
} from '~/containers/AuthenticationProvider/actions';
import {
  defaultSaga,
  resetPasswordSaga,
} from './sagas';
import { resetPasswordSuccessAction, resetPasswordFailedAction } from './actions';
import { RESET_PASSWORD_ACTION } from './constants';

const resetPasswordaAction = {
  payload: {
    email: 'new-tester@test.com',
  },
};

it('defaultSaga', () => {
  const task = createMockTask();

  testSaga(defaultSaga)
    .next()
    .takeLatest(RESET_PASSWORD_ACTION, resetPasswordSaga)
    .next(task)
    .take(LOCATION_CHANGE)
    .next()
    .cancel(task)
    .finish()
    .isDone();
});

it('resetPasswordSaga and succeed', () => {
  const response = { ...tokenAndUserData };

  testSaga(resetPasswordSaga, resetPasswordaAction)
    .next()
    .call(resetPasswordApiCall, resetPasswordaAction.payload)
    .next(response)
    .put(resetPasswordSuccessAction(response))
    .next()
    .put(successAuthenticationResponseAction(response))
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
    .next()
    .put(failedAuthenticationResponseAction(errorResponse))
    .finish()
    .isDone();
});
