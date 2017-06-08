/*
 *
 * RequestPasswordResetPage actions
 *
 */

import {
  REQUEST_PASSWORD_RESET_ACTION,
  REQUEST_PASSWORD_RESET_SUCCESS_ACTION,
  REQUEST_PASSWORD_RESET_FAILED_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

export function requestPasswordResetAction(requestPasswordPayload) {
  return {
    type: REQUEST_PASSWORD_RESET_ACTION,
    payload: requestPasswordPayload,
  };
}

export function requestPasswordResetSuccessAction(response) {
  return {
    type: REQUEST_PASSWORD_RESET_SUCCESS_ACTION,
    payload: response,
  };
}

export function requestPasswordResetFailedAction(rejection) {
  return {
    type: REQUEST_PASSWORD_RESET_FAILED_ACTION,
    payload: rejection,
  };
}

export function destroyPageAction() {
  return {
    type: DESTROY_PAGE_ACTION,
  };
}
