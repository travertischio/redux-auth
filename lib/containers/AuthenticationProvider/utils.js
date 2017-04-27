'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTokenInStorage = setTokenInStorage;
exports.getTokenFromStorage = getTokenFromStorage;
exports.removeTokenFromStorage = removeTokenFromStorage;
exports.getStateDataFromToken = getStateDataFromToken;
exports.calculateExpiryTime = calculateExpiryTime;
exports.getEmptyStateData = getEmptyStateData;

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _immutable = require('immutable');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint camelcase: 0 */
function setTokenInStorage(token) {
  try {
    localStorage.setItem(_constants.TOKEN_KEY, token);
    return true;
  } catch (e) {
    return false;
  }
}

function getTokenFromStorage() {
  try {
    return localStorage.getItem(_constants.TOKEN_KEY);
  } catch (e) {
    return undefined;
  }
}

function removeTokenFromStorage() {
  try {
    localStorage.removeItem(_constants.TOKEN_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

function getStateDataFromToken(token) {
  try {
    var data = (0, _jwtDecode2.default)(token);
    var tokenExpiryTime = calculateExpiryTime(data.exp);

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
    token: null
  });
}