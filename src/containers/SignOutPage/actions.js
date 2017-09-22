/*
 *
 * SignOutPage actions
 *
 */

import {
  SIGN_OUT_ACTION,
  SIGN_OUT_FAILED_ACTION,
} from './constants';

export function signOutAction() {
  return {
    type: SIGN_OUT_ACTION,
  };
}

export function signOutFailedAction() {
  return {
    type: SIGN_OUT_FAILED_ACTION,
  };
}

