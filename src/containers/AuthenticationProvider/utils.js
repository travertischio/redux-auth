import { fromJS } from 'immutable';
import moment from 'moment';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import {
  AUTH_KEY,
  TOKEN_STATUS_VALID,
  TOKEN_STATUS_AWAITING_SECOND_FACTOR,
  ENCRYPT_SECRET_KEY,
} from './constants';

export function setAuthDataInStorage(authData) {
  try {
    const currentAuthData = getAuthDataFromStorage();
    const mergedAuthData = {
      ...currentAuthData,
      ...authData,
    };
    const authDataAsString = JSON.stringify(mergedAuthData);
    const encryptedAuthData = AES.encrypt(authDataAsString, ENCRYPT_SECRET_KEY);

    localStorage.setItem(AUTH_KEY, encryptedAuthData);
    return true;
  } catch (e) {
    return false;
  }
}

export function getAuthDataFromStorage() {
  try {
    const localStorageItem = localStorage.getItem(AUTH_KEY);
    const decryptedLocalStorageItemBytes = AES.decrypt(localStorageItem, ENCRYPT_SECRET_KEY);
    const decryptedLocalStorageItem = decryptedLocalStorageItemBytes.toString(encUtf8);

    return JSON.parse(decryptedLocalStorageItem);
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

export function calculateExpiryTime(expireAt) {
  const now = moment();
  const expires = moment(expireAt);
  const expiresEarlierBy = 30 * 1000;

  return expires.diff(now) - expiresEarlierBy;
}

export function getInitialStateData() {
  return fromJS({
    isReady: false,
  });
}

export function tokenIsValid(tokenData) {
  return tokenData.status === TOKEN_STATUS_VALID;
}

export function tokenIsAwaitingSecondFactor(tokenData) {
  return tokenData.status === TOKEN_STATUS_AWAITING_SECOND_FACTOR;
}
