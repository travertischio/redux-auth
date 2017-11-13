/**
 * Test SignOutPage sagas
 */

import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import {
  clearTokenDataAction,
  clearUserDataAction,
} from '../AuthenticationProvider/actions';
import { signOutFailedAction } from './actions';
import { defaultSaga, signOutSaga } from './sagas';
import { SIGN_OUT_ACTION } from './constants';
import { signOut as signOutApiCall } from '../../api';
import config from '../../config';

it('defaultSaga', () => {
  const task1 = createMockTask();

  testSaga(defaultSaga)
    .next()
    .takeEveryEffect(SIGN_OUT_ACTION, signOutSaga)
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
    .call(signOutApiCall)
    .next()
    .put(clearTokenDataAction())
    .next()
    .put(clearUserDataAction())
    .next()
    .put(push(config.redirectPathAfterSignOut))
    .next()
    .finish()
    .isDone();
});

it('signOutSaga failes', () => {
  const errorResponse = {};

  testSaga(signOutSaga)
    .next()
    .call(signOutApiCall)
    .throw(errorResponse)
    .put(signOutFailedAction())
    .next()
    .put(clearTokenDataAction())
    .next()
    .put(clearUserDataAction())
    .next()
    .put(push(config.redirectPathAfterSignOut))
    .finish()
    .isDone();
});
