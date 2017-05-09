/* eslint camelcase: 0 */
import jwt_decode from 'jwt-decode';
import { fromJS } from 'immutable';
import moment from 'moment';
import { TOKEN_KEY } from './constants';

export function setTokenInStorage(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch (e) {
    return false;
  }
}

export function getTokenFromStorage() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    return undefined;
  }
}

export function removeTokenFromStorage() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

export function getStateDataFromToken(token) {
  try {
    const data = jwt_decode(token);
    const tokenExpiryTime = calculateExpiryTime(data.exp);

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
  });
}
