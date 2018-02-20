/**
 * Test SignUpPage sagas
 */

import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE } from 'react-router-redux';
import { signUp as signUpApiCall } from '~/api';
import { tokenAndUserData } from '~/test.data';
import {
  failedAuthenticationResponseAction,
  successAuthenticationResponseAction,
} from '~/containers/AuthenticationProvider/actions';
import {
  defaultSaga,
  signUpSaga,
} from './sagas';
import {
  signUpSuccessAction,
  signUpFailedAction,
} from './actions';
import { SIGN_UP_ACTION } from './constants';

const signUpAction = {
  payload: {
    email: 'tester@test.com',
    password: 'xyz123',
  },
};

new Promise((resolve, reject) => { // eslint-disable-line no-new
  signUpAction.resolve = resolve;
  signUpAction.reject = reject;
});

it('defaultSaga', () => {
  const task = createMockTask();

  testSaga(defaultSaga)
    .next()
    .takeLatestFork(SIGN_UP_ACTION, signUpSaga)
    .next(task)
    .take(LOCATION_CHANGE)
    .next()
    .cancel(task)
    .finish()
    .isDone();
});

it('signUpSaga and succeed', () => {
  const response = { ...tokenAndUserData };

  testSaga(signUpSaga, signUpAction)
    .next()
    .call(signUpApiCall, signUpAction.payload)
    .next(response)
    .call(signUpAction.resolve, response)
    .next()
    .put(signUpSuccessAction(response))
    .next()
    .put(successAuthenticationResponseAction(response))
    .finish()
    .isDone();
});

it('signUpSaga and failed', () => {
  const errorResponse = {
    non_field_errors: ['Username already exists'],
  };

  testSaga(signUpSaga, signUpAction)
    .next()
    .call(signUpApiCall, signUpAction.payload)
    .throw(errorResponse)
    .call(signUpAction.reject, errorResponse)
    .next()
    .put(signUpFailedAction(errorResponse))
    .next()
    .put(failedAuthenticationResponseAction(errorResponse))
    .finish()
    .isDone();
});
