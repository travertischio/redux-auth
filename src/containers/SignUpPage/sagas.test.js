/**
 * Test SignUpPage sagas
 */

import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE } from 'react-router-redux';
import { setTokenIfExistsSaga } from '../AuthenticationProvider/sagas';
import { signUp as signUpApiCall } from '../../api';
import {
  defaultSaga,
  signUpSaga,
} from './sagas';
import {
  signUpSuccessAction,
  signUpFailedAction,
} from './actions';
import {
  SIGN_UP_ACTION,
  SIGN_UP_SUCCESS_ACTION,
} from './constants';

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
  const task1 = createMockTask();
  const task2 = createMockTask();

  testSaga(defaultSaga)
    .next()
    .takeLatestFork(SIGN_UP_ACTION, signUpSaga)
    .next(task1)
    .takeEveryFork(SIGN_UP_SUCCESS_ACTION, setTokenIfExistsSaga)
    .next(task2)
    .take(LOCATION_CHANGE)
    .next()
    .cancel(task1)
    .next()
    .cancel(task2)
    .finish()
    .isDone();
});

it('signUpSaga and succeed', () => {
  testSaga(signUpSaga, signUpAction)
    .next()
    .call(signUpApiCall, signUpAction.payload)
    .next()
    .call(signUpAction.resolve, undefined)
    .next()
    .put(signUpSuccessAction())
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
    .finish()
    .isDone();
});
