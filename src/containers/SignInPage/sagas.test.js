/**
 * Test SignInPage sagas
 */

/* eslint-disable redux-saga/yield-effects */
import testSaga from 'redux-saga-test-plan';
import { LOCATION_CHANGE } from 'react-router-redux';
import { setTokenAction } from '../AuthenticationProvider/actions';
import { signIn as signInApiCall } from '../../api';
import { defaultSaga, signInSaga, setTokenSaga } from './sagas';
import { signInSucceedAction, signInFailedAction } from './actions';
import { SIGN_IN_ACTION, SIGN_IN_SUCCEED_ACTION } from './constants';

const signInAction = {
  payload: {
    email: 'tester@ydtech.co',
    password: 'xyz123',
  },
};

it('defaultSaga', () => {
  testSaga(defaultSaga)
    .next()
    .takeLatestFork(SIGN_IN_ACTION, signInSaga)
    .next()
    .takeEveryFork(SIGN_IN_SUCCEED_ACTION, setTokenSaga)
    .next()
    .take(LOCATION_CHANGE)
    .finish()
    .isDone();
});

it('signInSaga and succeed', () => {
  testSaga(signInSaga, signInAction)
    .next()
    .call(signInApiCall, signInAction.payload)
    .next()
    .put(signInSucceedAction())
    .finish()
    .isDone();
});

it('signInSaga and failed', () => {
  const errorResponse = {
    non_field_errors: ['Unable to log in with provided credentials.'],
  };

  testSaga(signInSaga, signInAction)
    .next()
    .call(signInApiCall, signInAction.payload)
    .throw(errorResponse)
    .put(signInFailedAction(errorResponse))
    .finish()
    .isDone();
});

it('setTokenSaga', () => {
  const action = {
    payload: {
      data: {
        token: 'XYZ',
      },
    },
  };

  testSaga(setTokenSaga, action)
    .next()
    .put(setTokenAction(action.payload.data.token))
    .finish()
    .isDone();
});
