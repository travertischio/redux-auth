/*
 *
 * SignUpPage actions
 *
 */

import {
  SIGN_UP_ACTION,
  SIGN_UP_SUCCEED_ACTION,
  SIGN_UP_FAILED_ACTION,
} from './constants';

export const signUpAction = (userData) => ({
  type: SIGN_UP_ACTION,
  payload: userData,
});

export const signUpSucceedAction = (response) => ({
  type: SIGN_UP_SUCCEED_ACTION,
  payload: response,
});

export const signUpFailedAction = (response) => ({
  type: SIGN_UP_FAILED_ACTION,
  payload: response,
});
