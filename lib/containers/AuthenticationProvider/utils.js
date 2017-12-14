'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setAuthDataInStorage = setAuthDataInStorage;
exports.getAuthDataFromStorage = getAuthDataFromStorage;
exports.setItemInStorage = setItemInStorage;
exports.getItemFromStorage = getItemFromStorage;
exports.removeAuthDataFromStorage = removeAuthDataFromStorage;
exports.calculateExpiryTime = calculateExpiryTime;
exports.getInitialStateData = getInitialStateData;
exports.tokenIsValid = tokenIsValid;
exports.tokenIsAwaitingSecondFactor = tokenIsAwaitingSecondFactor;
exports.isServerError = isServerError;
exports.isNoInternetConnectionError = isNoInternetConnectionError;
exports.storeLastUserToken = storeLastUserToken;
exports.generateLastUserTokenKey = generateLastUserTokenKey;

var _immutable = require('immutable');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _aes = require('crypto-js/aes');

var _aes2 = _interopRequireDefault(_aes);

var _md = require('crypto-js/md5');

var _md2 = _interopRequireDefault(_md);

var _encUtf = require('crypto-js/enc-utf8');

var _encUtf2 = _interopRequireDefault(_encUtf);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setAuthDataInStorage(authData) {
  var currentAuthData = getAuthDataFromStorage();
  var mergedAuthData = _extends({}, currentAuthData, authData);
  var authDataAsString = JSON.stringify(mergedAuthData);
  var encryptedAuthData = _aes2.default.encrypt(authDataAsString, _constants.ENCRYPT_SECRET_KEY).toString();

  return setItemInStorage(_constants.AUTH_KEY, encryptedAuthData);
}

function getAuthDataFromStorage() {
  var localStorageItem = getItemFromStorage(_constants.AUTH_KEY);

  if (localStorageItem) {
    try {
      var decryptedLocalStorageItemBytes = _aes2.default.decrypt(localStorageItem, _constants.ENCRYPT_SECRET_KEY);
      var decryptedLocalStorageItem = decryptedLocalStorageItemBytes.toString(_encUtf2.default);

      return JSON.parse(decryptedLocalStorageItem);
    } catch (e) {
      return null;
    }
  }

  return localStorageItem;
}

function setItemInStorage(key, value) {
  try {
    var serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);

    return true;
  } catch (e) {
    return false;
  }
}

function getItemFromStorage(key) {
  try {
    var serializedValue = localStorage.getItem(key);

    return JSON.parse(serializedValue);
  } catch (e) {
    return undefined;
  }
}

function removeAuthDataFromStorage() {
  try {
    localStorage.removeItem(_constants.AUTH_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

function calculateExpiryTime(expireAt) {
  var now = (0, _moment2.default)();
  var expires = (0, _moment2.default)(expireAt);
  var expiresEarlierBy = 30 * 1000;

  return expires.diff(now) - expiresEarlierBy;
}

function getInitialStateData() {
  return (0, _immutable.fromJS)({
    isReady: false
  });
}

function tokenIsValid(tokenData) {
  return tokenData.status === _constants.TOKEN_STATUS_VALID;
}

function tokenIsAwaitingSecondFactor(tokenData) {
  return tokenData.status === _constants.TOKEN_STATUS_AWAITING_SECOND_FACTOR;
}

function isServerError(error) {
  var status = error.response && error.response.status;

  return status >= 500;
}

function isNoInternetConnectionError(error) {
  return !error.response;
}

function storeLastUserToken(email, token) {
  var currentAuthData = getAuthDataFromStorage();

  currentAuthData.lastTokens = currentAuthData.lastTokens || {};
  currentAuthData.lastTokens[email] = token;

  return setAuthDataInStorage(currentAuthData);
}

function generateLastUserTokenKey(rawKey) {
  return (0, _md2.default)(rawKey).toString();
}