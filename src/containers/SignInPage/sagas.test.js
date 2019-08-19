/**
 * Test SignInPage sagas
 */
import { fromJS } from 'immutable';
import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from '@redux-saga/testing-utils';
import { LOCATION_CHANGE } from 'react-router-redux';
import { signIn as signInApiCall } from '~/api';
import { tokenAndUserData } from '~/test.data';
import { makeSelectLastUserToken } from '~/containers/AuthenticationProvider/selectors';
import {
  failedAuthenticationResponseAction,
  successAuthenticationResponseAction,
} from '~/containers/AuthenticationProvider/actions';
import {
  signInSaga,
  watchSignInAction,
} from './sagas';
import {
  signInSuccessAction,
  signInFailedAction,
} from './actions';
import { SIGN_IN_ACTION } from './constants';

const signInAction = {
  credentials: fromJS({
    email: 'tester@test.com',
    password: 'xyz123',
  }),
};
const selectLastUserTokenMock = () => '2d5b44e242a5f4dccec5c36beafffc33195e5ce9';
const credentials = {
  token: selectLastUserTokenMock(),
  ...signInAction.credentials.toJS(),
};

it('watchSignInAction', () => {
  const task = createMockTask();

  testSaga(watchSignInAction)
    .next()
    .takeLatestEffect(SIGN_IN_ACTION, signInSaga)
    .next(task)
    .take(LOCATION_CHANGE)
    .next()
    .cancel(task)
    .finish()
    .isDone();
});

it('signInSaga and succeed', () => {
  const response = { ...tokenAndUserData };

  testSaga(signInSaga, signInAction)
    .next()
    .call(makeSelectLastUserToken, signInAction.credentials.get('email'))
    .next(selectLastUserTokenMock)
    .select(selectLastUserTokenMock)
    .next(selectLastUserTokenMock())
    .call(signInApiCall, credentials)
    .next(response)
    .put(signInSuccessAction(response))
    .next()
    .put(successAuthenticationResponseAction(response))
    .finish()
    .isDone();
});

it('signInSaga and failed', () => {
  const errorResponse = {
    nonFieldErrors: ['Unable to log in with provided credentials.'],
  };

  testSaga(signInSaga, signInAction)
    .next()
    .call(makeSelectLastUserToken, signInAction.credentials.get('email'))
    .next(selectLastUserTokenMock)
    .select(selectLastUserTokenMock)
    .next(selectLastUserTokenMock())
    .call(signInApiCall, credentials)
    .throw(errorResponse)
    .put(signInFailedAction(errorResponse))
    .next()
    .put(failedAuthenticationResponseAction(errorResponse))
    .finish()
    .isDone();
});
