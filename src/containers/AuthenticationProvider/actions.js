/*
 *
 * AuthenticationProvider actions
 *
 */
import { routerActions } from 'react-router-redux';
import queryString from 'query-string';
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

export function redirectActionWithSupportParamInQueryString(action) {
  const { redirect } = queryString.parse(location.search);

  if (redirect) {
    return routerActions.replace({
      pathname: redirect,
    });
  }

  return routerActions.replace(action);
}
