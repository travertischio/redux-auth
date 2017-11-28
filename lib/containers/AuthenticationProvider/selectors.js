'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectUserDataFromActionPayload = exports.selectUserDataExists = exports.selectUser = exports.selectTokenIsExpired = exports.selectTokenExpiryTime = exports.selectTokenExpireInMs = exports.selectTokenDataFromActionPayload = exports.selectTokenDataExists = exports.selectTokenData = exports.selectToken = exports.selectIsAuthenticated = exports.selectIsReady = exports.selectAuthenticationDomain = undefined;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reselect = require('reselect');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectAuthenticationDomain = function selectAuthenticationDomain(state) {
  return state.get('auth');
};

var selectTokenData = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.get('tokenData');
});

var selectToken = (0, _reselect.createSelector)(selectTokenData, function (tokenData) {
  return tokenData && tokenData.get('key');
});

var selectTokenExpiryTime = (0, _reselect.createSelector)(selectTokenData, function (tokenData) {
  return tokenData && tokenData.get('expireAt');
});

var selectTokenExpireInMs = (0, _reselect.createSelector)(selectTokenExpiryTime, function (expireAt) {
  return (0, _utils.calculateExpiryTime)(expireAt);
});

var selectTokenIsExpired = (0, _reselect.createSelector)(selectTokenExpiryTime, function (expireAt) {
  return (0, _moment2.default)().diff(expireAt) >= 0;
});

var selectUser = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  var userData = authState.get('userData');

  return userData ? userData.toJS() : null;
});

var selectTokenDataExists = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.has('tokenData');
});

var selectUserDataExists = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.has('userData');
});

var selectIsAuthenticated = (0, _reselect.createSelector)(selectTokenDataExists, selectUserDataExists, function (tokenDataExists, userDataExists) {
  return tokenDataExists && userDataExists;
});

var selectIsReady = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.get('isReady');
});

var selectTokenDataFromActionPayload = function selectTokenDataFromActionPayload(action) {
  return (0, _get3.default)(action, ['payload', 'data', 'tokenData']);
};

var selectUserDataFromActionPayload = function selectUserDataFromActionPayload(action) {
  return (0, _get3.default)(action, ['payload', 'data', 'userData']);
};

exports.selectAuthenticationDomain = selectAuthenticationDomain;
exports.selectIsReady = selectIsReady;
exports.selectIsAuthenticated = selectIsAuthenticated;
exports.selectToken = selectToken;
exports.selectTokenData = selectTokenData;
exports.selectTokenDataExists = selectTokenDataExists;
exports.selectTokenDataFromActionPayload = selectTokenDataFromActionPayload;
exports.selectTokenExpireInMs = selectTokenExpireInMs;
exports.selectTokenExpiryTime = selectTokenExpiryTime;
exports.selectTokenIsExpired = selectTokenIsExpired;
exports.selectUser = selectUser;
exports.selectUserDataExists = selectUserDataExists;
exports.selectUserDataFromActionPayload = selectUserDataFromActionPayload;