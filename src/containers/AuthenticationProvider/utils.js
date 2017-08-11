/* eslint camelcase: 0 */
import jwt_decode from 'jwt-decode';
import humps from 'humps';
import { fromJS } from 'immutable';
import moment from 'moment';
import { AUTH_KEY } from './constants';
import config from '../../config';

export function setAuthDataInStorage(authData) {
  try {
    const currentAuthData = getAuthDataFromStorage();
    const mergedAuthData = JSON.stringify({
      ...currentAuthData,
      ...authData,
    });

    localStorage.setItem(AUTH_KEY, mergedAuthData);
    return true;
  } catch (e) {
    return false;
  }
}

export function getAuthDataFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch (e) {
    return undefined;
  }
}

export function removeAuthDataFromStorage() {
  try {
    localStorage.removeItem(AUTH_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

export function getStateDataFromToken(token) {
  try {
    let data = jwt_decode(token);
    const tokenExpiryTime = calculateExpiryTime(data.exp);

    if (config.camelizeUserDataKeys) {
      data = humps.camelizeKeys(data);
    }

    return fromJS({
      isAuthenticated: true,
      hasTokenRefreshed: true,
      user: data.user,
      tokenExpiryTime,
      token,
    });
  } catch (e) {
    return getEmptyStateData();
  }
}

export function calculateExpiryTime(expireTimestamp) {
  const expires = moment(expireTimestamp * 1000);
  const now = moment();
  const expiresEarlierBy = 30 * 1000;
  return expires.diff(now) - expiresEarlierBy;
}

export function getEmptyStateData() {
  return fromJS({
    isAuthenticated: false,
    hasTokenRefreshed: false,
    user: null,
    token: null,
    permanentToken: null,
    deviceId: null,
  });
}
