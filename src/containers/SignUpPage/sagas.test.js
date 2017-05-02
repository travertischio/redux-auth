/**
 * Test SignUpPage sagas
 */

/* eslint-disable redux-saga/yield-effects */
import testSaga from 'redux-saga-test-plan';
import { LOCATION_CHANGE } from 'react-router-redux';
import { setTokenIfExistsSaga } from '../AuthenticationProvider/sagas';
import { signUp as signUpApiCall } from '../../api';
import { defaultSaga, signUpSaga } from './sagas';
import { signUpSucceedAction, signUpFailedAction } from './actions';
import { SIGN_UP_ACTION, SIGN_UP_SUCCEED_ACTION } from './constants';

const signUpAction = {
  payload: {
    email: 'tester@ydtech.co',
    password: 'xyz123',
  },
};

it('defaultSaga', () => {
  testSaga(defaultSaga)
    .next()
    .takeLatestFork(SIGN_UP_ACTION, signUpSaga)
    .next()
    .takeEveryFork(SIGN_UP_SUCCEED_ACTION, setTokenIfExistsSaga)
    .next()
    .take(LOCATION_CHANGE)
    .finish()
    .isDone();
});

it('signUpSaga and succeed', () => {
  testSaga(signUpSaga, signUpAction)
    .next()
    .call(signUpApiCall, signUpAction.payload)
    .next()
    .put(signUpSucceedAction())
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
    .put(signUpFailedAction(errorResponse))
    .finish()
    .isDone();
});
