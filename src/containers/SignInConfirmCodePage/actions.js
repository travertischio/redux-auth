/*
 *
 * SignInConfirmCodePage actions
 *
 */

import {
  CONFIRM_CODE_ACTION,
  CONFIRM_CODE_SUCCESS_ACTION,
  CONFIRM_CODE_FAILED_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

export function confirmCodeAction(payload) {
  return {
    type: CONFIRM_CODE_ACTION,
    payload,
  };
}

export function confirmCodeSuccessAction(response) {
  return {
    type: CONFIRM_CODE_SUCCESS_ACTION,
    payload: response,
  };
}

export function confirmCodeFailedAction(rejection) {
  return {
    type: CONFIRM_CODE_FAILED_ACTION,
    payload: rejection,
  };
}

export function destroyPageAction() {
  return {
    type: DESTROY_PAGE_ACTION,
  };
}
