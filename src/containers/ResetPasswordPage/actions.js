/*
 *
 * ResetPasswordPage actions
 *
 */

import {
  RESET_PASSWORD_ACTION,
  RESET_PASSWORD_SUCCEED_ACTION,
  RESET_PASSWORD_FAILED_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

export function resetPasswordAction(newPasswordPayload) {
  return {
    type: RESET_PASSWORD_ACTION,
    payload: newPasswordPayload,
  };
}

export function resetPasswordSucceedAction(response) {
  return {
    type: RESET_PASSWORD_SUCCEED_ACTION,
    payload: response,
  };
}

export function resetPasswordFailedAction(rejection) {
  return {
    type: RESET_PASSWORD_FAILED_ACTION,
    payload: rejection,
  };
}

export function destroyPageAction() {
  return {
    type: DESTROY_PAGE_ACTION,
  };
}
