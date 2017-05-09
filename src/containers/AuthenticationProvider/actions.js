/*
 *
 * AuthenticationProvider actions
 *
 */

import {
  SET_TOKEN_ACTION,
  CLEAR_TOKEN_ACTION,
  REFRESH_TOKEN_ACTION,
  MARK_TOKEN_AS_REFRESHED_ACTION,
} from './constants';

export function setTokenAction(token) {
  return {
    type: SET_TOKEN_ACTION,
    payload: token,
  };
}

export function clearTokenAction() {
  return {
    type: CLEAR_TOKEN_ACTION,
  };
}

export function refreshTokenAction() {
  return {
    type: REFRESH_TOKEN_ACTION,
  };
}

export function markTokenAsRefreshedAction() {
  return {
    type: MARK_TOKEN_AS_REFRESHED_ACTION,
  };
}
