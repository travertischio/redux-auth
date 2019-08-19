/**
 * Test SignOutPage sagas
 */

import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from '@redux-saga/testing-utils';
import {
  LOCATION_CHANGE,
  push,
} from 'react-router-redux';
import {
  SIGN_OUT_SUCCESS_ACTION,
  SIGN_OUT_FAILED_ACTION,
} from '~/containers/AuthenticationProvider/constants';
import config from '~/config';
import {
  defaultSaga,
  signOutSaga,
} from './sagas';

it('defaultSaga', () => {
  const task1 = createMockTask();
  const task2 = createMockTask();

  testSaga(defaultSaga)
    .next()
    .takeEvery(SIGN_OUT_SUCCESS_ACTION, signOutSaga)
    .next(task1)
    .takeEvery(SIGN_OUT_FAILED_ACTION, signOutSaga)
    .next(task2)
    .take(LOCATION_CHANGE)
    .next()
    .cancel(task1)
    .next()
    .cancel(task2)
    .next()
    .finish()
    .isDone();
});

it('signOutSaga', () => {
  testSaga(signOutSaga)
    .next()
    .put(push(config.redirectPathAfterSignOut))
    .next()
    .finish()
    .isDone();
});
