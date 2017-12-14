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
  const currentAuthData = getAuthDataFromStorage();
  const mergedAuthData = {
    ...currentAuthData,
    ...authData,
  };
  const authDataAsString = JSON.stringify(mergedAuthData);
  const encryptedAuthData = AES.encrypt(authDataAsString, ENCRYPT_SECRET_KEY).toString();

  return setItemInStorage(AUTH_KEY, encryptedAuthData);
}

export function getAuthDataFromStorage() {
  const localStorageItem = getItemFromStorage(AUTH_KEY);

  if (localStorageItem) {
    try {
      const decryptedLocalStorageItemBytes = AES.decrypt(localStorageItem, ENCRYPT_SECRET_KEY);
      const decryptedLocalStorageItem = decryptedLocalStorageItemBytes.toString(encUtf8);

      return JSON.parse(decryptedLocalStorageItem);
    } catch (e) {
      return null;
    }
  }

  return localStorageItem;
}

export function setItemInStorage(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);

    return true;
  } catch (e) {
    return false;
  }
}

export function getItemFromStorage(key) {
  try {
    const serializedValue = localStorage.getItem(key);

    return JSON.parse(serializedValue);
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

export function isServerError(error) {
  const status = error.response && error.response.status;

  return status >= 500;
}

export function isNoInternetConnectionError(error) {
  return !error.response;
}
