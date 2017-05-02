/**
 * Test SignOutPage sagas
 */

/* eslint-disable redux-saga/yield-effects */
import testSaga from 'redux-saga-test-plan';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { clearTokenAction } from '../AuthenticationProvider/actions';
import { defaultSaga, signOutSaga } from './sagas';
import { SIGN_OUT_ACTION } from './constants';

it('defaultSaga', () => {
  testSaga(defaultSaga)
    .next()
    .takeEveryFork(SIGN_OUT_ACTION, signOutSaga)
    .next()
    .take(LOCATION_CHANGE)
    .finish()
    .isDone();
});

it('signOutSaga', () => {
  testSaga(signOutSaga)
    .next()
    .put(clearTokenAction())
    .next()
    .put(push('/'))
    .finish()
    .isDone();
});

