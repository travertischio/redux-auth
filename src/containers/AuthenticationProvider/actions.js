/*
 *
 * AuthenticationProvider actions
 *
 */
import { routerActions } from 'react-router-redux';
import queryString from 'query-string';
import {
  SET_TOKEN_DATA_ACTION,
  CLEAR_TOKEN_DATA_ACTION,
  EXTEND_TOKEN_LIFETIME_ACTION,
  MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION,
  SET_USER_DATA_ACTION,
  CLEAR_USER_DATA_ACTION,
  TWO_FACTOR_SEND_CODE_ACTION,
  TWO_FACTOR_SEND_CODE_SUCCESS_ACTION,
  TWO_FACTOR_SEND_CODE_FAILED_ACTION,
  SIGN_OUT_ACTION,
  SIGN_OUT_SUCCESS_ACTION,
  SIGN_OUT_FAILED_ACTION,
} from './constants';

export function setTokenDataAction(tokenData) {
  return {
    type: SET_TOKEN_DATA_ACTION,
    tokenData,
  };
}

export function clearTokenDataAction() {
  return {
    type: CLEAR_TOKEN_DATA_ACTION,
  };
}

export function extendTokenLifetimeAction() {
  return {
    type: EXTEND_TOKEN_LIFETIME_ACTION,
  };
}

export function markAuthenticationProviderAsReadyAction() {
  return {
    type: MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION,
  };
}

export function setUserDataAction(userData) {
  return {
    type: SET_USER_DATA_ACTION,
    userData,
  };
}

export function clearUserDataAction() {
  return {
    type: CLEAR_USER_DATA_ACTION,
  };
}

export function twoFactorSendCodeAction(token) {
  return {
    type: TWO_FACTOR_SEND_CODE_ACTION,
    token,
  };
}

export function twoFactorSendCodeSuccessAction() {
  return {
    type: TWO_FACTOR_SEND_CODE_SUCCESS_ACTION,
  };
}

export function twoFactorSendCodeFailedAction(error) {
  return {
    type: TWO_FACTOR_SEND_CODE_FAILED_ACTION,
    error,
  };
}

export function redirectActionWithSupportParamInQueryString(action) {
  const { redirect } = queryString.parse(location.search);

  if (redirect) {
    return routerActions.replace({
      pathname: redirect,
    });
  }

  return routerActions.replace(action);
}

export function signOutAction() {
  return {
    type: SIGN_OUT_ACTION,
  };
}

export function signOutSuccessAction() {
  return {
    type: SIGN_OUT_SUCCESS_ACTION,
  };
}

export function signOutFailedAction() {
  return {
    type: SIGN_OUT_FAILED_ACTION,
  };
}
