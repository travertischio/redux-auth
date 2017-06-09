/**
 * Test SignOutPage sagas
 */

/* eslint-disable redux-saga/yield-effects */
import testSaga from 'redux-saga-test-plan';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { clearTokenAction } from '../AuthenticationProvider/actions';
import { defaultSaga, signOutSaga } from './sagas';
import { SIGN_OUT_ACTION } from './constants';
import config from '../../config';

it('defaultSaga', () => {
  const task1 = createMockTask();

  testSaga(defaultSaga)
    .next()
    .takeEveryFork(SIGN_OUT_ACTION, signOutSaga)
    .next(task1)
    .take(LOCATION_CHANGE)
    .next()
    .cancel(task1)
    .finish()
    .isDone();
});

it('signOutSaga', () => {
  testSaga(signOutSaga)
    .next()
    .put(clearTokenAction())
    .next()
    .put(push(config.redirectPathAfterSignOut))
    .finish()
    .isDone();
});

