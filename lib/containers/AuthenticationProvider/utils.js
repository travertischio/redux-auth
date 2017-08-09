'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint camelcase: 0 */


exports.setAuthDataInStorage = setAuthDataInStorage;
exports.getAuthDataFromStorage = getAuthDataFromStorage;
exports.removeAuthDataFromStorage = removeAuthDataFromStorage;
exports.getStateDataFromToken = getStateDataFromToken;
exports.calculateExpiryTime = calculateExpiryTime;
exports.getEmptyStateData = getEmptyStateData;

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _humps = require('humps');

var _humps2 = _interopRequireDefault(_humps);

var _immutable = require('immutable');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _constants = require('./constants');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setAuthDataInStorage(authData) {
  try {
    var currentAuthData = getAuthDataFromStorage();
    var mergedAuthData = JSON.stringify(_extends({}, currentAuthData, authData));

    localStorage.setItem(_constants.AUTH_KEY, mergedAuthData);
    return true;
  } catch (e) {
    return false;
  }
}

function getAuthDataFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(_constants.AUTH_KEY));
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

function getStateDataFromToken(token) {
  try {
    var data = (0, _jwtDecode2.default)(token);
    var tokenExpiryTime = calculateExpiryTime(data.exp);

    if (_config2.default.camelizeUserDataKeys) {
      data = _humps2.default.camelizeKeys(data);
    }

    return (0, _immutable.fromJS)({
      isAuthenticated: true,
      hasTokenRefreshed: true,
      user: data.user,
      tokenExpiryTime: tokenExpiryTime,
      token: token
    });
  } catch (e) {
    return getEmptyStateData();
  }
}

function calculateExpiryTime(expireTimestamp) {
  var expires = (0, _moment2.default)(expireTimestamp * 1000);
  var now = (0, _moment2.default)();
  var expiresEarlierBy = 30 * 1000;
  return expires.diff(now) - expiresEarlierBy;
}

function getEmptyStateData() {
  return (0, _immutable.fromJS)({
    isAuthenticated: false,
    hasTokenRefreshed: false,
    user: null,
    token: null,
    permanentToken: null,
    deviceId: null
  });
}