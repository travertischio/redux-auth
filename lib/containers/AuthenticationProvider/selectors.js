'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectUserDataFromActionPayload = exports.selectUserDataExists = exports.selectUser = exports.selectTokenIsExpired = exports.selectTokenExpiryTime = exports.selectExtendTokenWithinMs = exports.selectTokenDataFromActionPayload = exports.selectTokenDataAsInvalid = exports.selectTokenData = exports.selectToken = exports.selectTokeIsValid = exports.selectTokeDataExists = exports.selectLastTokens = exports.selectIsReady = exports.selectIsAuthenticated = exports.selectAuthenticationDomain = exports.makeSelectLastUserToken = undefined;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reselect = require('reselect');

var _utils = require('./utils');

var _constants = require('./constants');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

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

var selectTokenDataAsInvalid = (0, _reselect.createSelector)(selectTokenData, function (tokenData) {
  return tokenData && tokenData.set('status', _constants.TOKEN_STATUS_INVALID).toJS();
});

var selectTokenExpiryTime = (0, _reselect.createSelector)(selectTokenData, function (tokenData) {
  return tokenData && tokenData.get('expireAt');
});

var selectExtendTokenWithinMs = (0, _reselect.createSelector)(selectTokenExpiryTime, function (expireAt) {
  return (0, _utils.calculateExtendTokenWithinMs)(expireAt, _config2.default.autoSignOutWithin);
});

var selectTokenIsExpired = (0, _reselect.createSelector)(selectTokenExpiryTime, function (expireAt) {
  return (0, _moment2.default)().diff(expireAt) >= 0;
});

var selectLastTokens = (0, _reselect.createSelector)(selectAuthenticationDomain, function (tokenData) {
  return tokenData && tokenData.get('lastTokens');
});

var makeSelectLastUserToken = function makeSelectLastUserToken(email) {
  return (0, _reselect.createSelector)(selectLastTokens, function (lastTokens) {
    return lastTokens && lastTokens.get((0, _utils.generateLastUserTokenKey)(email));
  });
};

var selectUser = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  var userData = authState.get('userData');

  return userData ? userData.toJS() : null;
});

var selectTokeIsValid = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.getIn(['tokenData', 'status']) === _constants.TOKEN_STATUS_VALID;
});

var selectTokeDataExists = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.has('tokenData');
});

var selectUserDataExists = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.has('userData');
});

var selectIsAuthenticated = (0, _reselect.createSelector)(selectTokeIsValid, selectUserDataExists, function (tokeIsValid, userDataExists) {
  return tokeIsValid && userDataExists;
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

exports.makeSelectLastUserToken = makeSelectLastUserToken;
exports.selectAuthenticationDomain = selectAuthenticationDomain;
exports.selectIsAuthenticated = selectIsAuthenticated;
exports.selectIsReady = selectIsReady;
exports.selectLastTokens = selectLastTokens;
exports.selectTokeDataExists = selectTokeDataExists;
exports.selectTokeIsValid = selectTokeIsValid;
exports.selectToken = selectToken;
exports.selectTokenData = selectTokenData;
exports.selectTokenDataAsInvalid = selectTokenDataAsInvalid;
exports.selectTokenDataFromActionPayload = selectTokenDataFromActionPayload;
exports.selectExtendTokenWithinMs = selectExtendTokenWithinMs;
exports.selectTokenExpiryTime = selectTokenExpiryTime;
exports.selectTokenIsExpired = selectTokenIsExpired;
exports.selectUser = selectUser;
exports.selectUserDataExists = selectUserDataExists;
exports.selectUserDataFromActionPayload = selectUserDataFromActionPayload;