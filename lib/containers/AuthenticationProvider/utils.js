'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setAuthDataInStorage = setAuthDataInStorage;
exports.getAuthDataFromStorage = getAuthDataFromStorage;
exports.removeAuthDataFromStorage = removeAuthDataFromStorage;
exports.calculateExpiryTime = calculateExpiryTime;
exports.getInitialStateData = getInitialStateData;
exports.tokenIsValid = tokenIsValid;
exports.tokenIsAwaitingSecondFactor = tokenIsAwaitingSecondFactor;

var _immutable = require('immutable');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _aes = require('crypto-js/aes');

var _aes2 = _interopRequireDefault(_aes);

var _encUtf = require('crypto-js/enc-utf8');

var _encUtf2 = _interopRequireDefault(_encUtf);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENCRYPT_SECRET_KEY = 'bIHB|Cb&+ei9{"C("Aax7<k:P^a;cz';

function setAuthDataInStorage(authData) {
  try {
    var currentAuthData = getAuthDataFromStorage();
    var mergedAuthData = _extends({}, currentAuthData, authData);
    var authDataAsString = JSON.stringify(mergedAuthData);
    var encryptedAuthData = _aes2.default.encrypt(authDataAsString, ENCRYPT_SECRET_KEY);

    localStorage.setItem(_constants.AUTH_KEY, encryptedAuthData);
    return true;
  } catch (e) {
    return false;
  }
}

function getAuthDataFromStorage() {
  try {
    var localStorageItem = localStorage.getItem(_constants.AUTH_KEY);
    var decryptedLocalStorageItemBytes = _aes2.default.decrypt(localStorageItem, ENCRYPT_SECRET_KEY);
    var decryptedLocalStorageItem = decryptedLocalStorageItemBytes.toString(_encUtf2.default);

    return JSON.parse(decryptedLocalStorageItem);
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