/*
 *
 * SignInPage actions
 *
 */

import {
  SIGN_IN_ACTION,
  SIGN_IN_SUCCEED_ACTION,
  SIGN_IN_FAILED_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

export function signInAction(credentials) {
  return {
    type: SIGN_IN_ACTION,
    payload: credentials,
  };
}

export function signInSucceedAction(response) {
  return {
    type: SIGN_IN_SUCCEED_ACTION,
    payload: response,
  };
}

export function signInFailedAction(rejection) {
  return {
    type: SIGN_IN_FAILED_ACTION,
    payload: rejection,
  };
}

export function destroyPageAction() {
  return {
    type: DESTROY_PAGE_ACTION,
  };
}
