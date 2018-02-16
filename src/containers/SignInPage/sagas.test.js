/**
 * Test SignInPage sagas
 */

import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE } from 'react-router-redux';
// import {
//   setTokenDataAction,
//   setUserDataAction,
// } from '../AuthenticationProvider/actions';
import { signIn as signInApiCall } from '../../api';
import {
  defaultSaga,
  signInSaga,
  // onSignInSuccessSaga,
} from './sagas';
import {
  signInSuccessAction,
  signInFailedAction,
} from './actions';
import {
  SIGN_IN_ACTION,
  SIGN_IN_SUCCESS_ACTION,
} from './constants';
import { handleAuthenticationSaga } from '../AuthenticationProvider/sagas';

const signInAction = {
  payload: {
    email: 'tester@test.com',
    password: 'xyz123',
  },
};

it('defaultSaga', () => {
  const task1 = createMockTask();
  const task2 = createMockTask();

  testSaga(defaultSaga)
    .next()
    .takeLatestEffect(SIGN_IN_ACTION, signInSaga)
    .next(task1)
    .takeEveryEffect(SIGN_IN_SUCCESS_ACTION, handleAuthenticationSaga)
    .next(task2)
    .take(LOCATION_CHANGE)
    .next()
    .cancel(task1)
    .next()
    .cancel(task2)
    .finish()
    .isDone();
});

it('signInSaga and succeed', () => {
  testSaga(signInSaga, signInAction)
    .next()
    .call(signInApiCall, signInAction.payload)
    .next()
    .put(signInSuccessAction())
    .finish()
    .isDone();
});

it('signInSaga and failed', () => {
  const errorResponse = {
    nonFieldErrors: ['Unable to log in with provided credentials.'],
  };

  testSaga(signInSaga, signInAction)
    .next()
    .call(signInApiCall, signInAction.payload)
    .throw(errorResponse)
    .put(signInFailedAction(errorResponse))
    .finish()
    .isDone();
});
