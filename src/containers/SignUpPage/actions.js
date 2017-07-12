/*
 *
 * SignUpPage actions
 *
 */

import {
  SIGN_UP_ACTION,
  SIGN_UP_SUCCESS_ACTION,
  SIGN_UP_FAILED_ACTION,
} from './constants';

export const signUpAction = (userData, resolve, reject) => ({
  type: SIGN_UP_ACTION,
  payload: userData,
  resolve,
  reject,
});

export const signUpSuccessAction = (response) => ({
  type: SIGN_UP_SUCCESS_ACTION,
  payload: response,
});

export const signUpFailedAction = (response) => ({
  type: SIGN_UP_FAILED_ACTION,
  payload: response,
});
