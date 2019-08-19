"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAuthDataInStorage = setAuthDataInStorage;
exports.getAuthDataFromStorage = getAuthDataFromStorage;
exports.setItemInStorage = setItemInStorage;
exports.getItemFromStorage = getItemFromStorage;
exports.removeAuthDataFromStorage = removeAuthDataFromStorage;
exports.calculateExtendTokenWithinMs = calculateExtendTokenWithinMs;
exports.calculateExpiryTime = calculateExpiryTime;
exports.getInitialStateData = getInitialStateData;
exports.tokenIsValid = tokenIsValid;
exports.tokenIsAwaitingSecondFactor = tokenIsAwaitingSecondFactor;
exports.isServerError = isServerError;
exports.isNoInternetConnectionError = isNoInternetConnectionError;
exports.storeLastUserToken = storeLastUserToken;
exports.generateLastUserTokenKey = generateLastUserTokenKey;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _immutable = require("immutable");

var _moment = _interopRequireDefault(require("moment"));

var _aes = _interopRequireDefault(require("crypto-js/aes"));

var _md = _interopRequireDefault(require("crypto-js/md5"));

var _encUtf = _interopRequireDefault(require("crypto-js/enc-utf8"));

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function setAuthDataInStorage(authData) {
  var currentAuthData = getAuthDataFromStorage();

  var mergedAuthData = _objectSpread({}, currentAuthData, {}, authData);

  var authDataAsString = JSON.stringify(mergedAuthData);

  var encryptedAuthData = _aes["default"].encrypt(authDataAsString, _constants.ENCRYPT_SECRET_KEY).toString();

  return setItemInStorage(_constants.AUTH_KEY, encryptedAuthData);
}

function getAuthDataFromStorage() {
  var localStorageItem = getItemFromStorage(_constants.AUTH_KEY);

  if (localStorageItem) {
    try {
      var decryptedLocalStorageItemBytes = _aes["default"].decrypt(localStorageItem, _constants.ENCRYPT_SECRET_KEY);

      var decryptedLocalStorageItem = decryptedLocalStorageItemBytes.toString(_encUtf["default"]);
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

function calculateExtendTokenWithinMs(expireAt, autoSignOutWithin) {
  var tokenExpireInMs = calculateExpiryTime(expireAt);

  if (autoSignOutWithin) {
    return Math.min(tokenExpireInMs, 5 * 60 * 1000);
  }

  return tokenExpireInMs;
}

function calculateExpiryTime(expireAt) {
  var now = (0, _moment["default"])();
  var expires = (0, _moment["default"])(expireAt);
  var expiresEarlierBy = 60 * 1000;
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

function storeLastUserToken(key, token) {
  var currentAuthData = getAuthDataFromStorage();
  currentAuthData.lastTokens = currentAuthData.lastTokens || {};
  currentAuthData.lastTokens[key] = token;
  return setAuthDataInStorage(currentAuthData);
}

function generateLastUserTokenKey(rawKey) {
  return (0, _md["default"])(rawKey.toLowerCase().trim()).toString();
}