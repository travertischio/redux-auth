"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectUserDataExists = exports.selectUser = exports.selectTokenIsExpired = exports.selectTokenExpiryTime = exports.selectExtendTokenWithinMs = exports.selectTokenDataAsInvalid = exports.selectTokenData = exports.selectToken = exports.selectTokeIsValid = exports.selectTokeDataExists = exports.selectLastTokens = exports.selectIsReady = exports.selectIsAuthenticated = exports.selectAuthenticationDomain = exports.makeSelectLastUserToken = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _reselect = require("reselect");

var _config = _interopRequireDefault(require("../../config"));

var _utils = require("./utils");

var _constants = require("./constants");

var selectAuthenticationDomain = function selectAuthenticationDomain(state) {
  return state.get('auth');
};

exports.selectAuthenticationDomain = selectAuthenticationDomain;
var selectTokenData = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.get('tokenData');
});
exports.selectTokenData = selectTokenData;
var selectToken = (0, _reselect.createSelector)(selectTokenData, function (tokenData) {
  return tokenData && tokenData.get('key');
});
exports.selectToken = selectToken;
var selectTokenDataAsInvalid = (0, _reselect.createSelector)(selectTokenData, function (tokenData) {
  return tokenData && tokenData.set('status', _constants.TOKEN_STATUS_INVALID).toJS();
});
exports.selectTokenDataAsInvalid = selectTokenDataAsInvalid;
var selectTokenExpiryTime = (0, _reselect.createSelector)(selectTokenData, function (tokenData) {
  return tokenData && tokenData.get('expireAt');
});
exports.selectTokenExpiryTime = selectTokenExpiryTime;
var selectExtendTokenWithinMs = (0, _reselect.createSelector)(selectTokenExpiryTime, function (expireAt) {
  return (0, _utils.calculateExtendTokenWithinMs)(expireAt, _config["default"].autoSignOutWithin);
});
exports.selectExtendTokenWithinMs = selectExtendTokenWithinMs;
var selectTokenIsExpired = (0, _reselect.createSelector)(selectTokenExpiryTime, function (expireAt) {
  return (0, _moment["default"])().diff(expireAt) >= 0;
});
exports.selectTokenIsExpired = selectTokenIsExpired;
var selectLastTokens = (0, _reselect.createSelector)(selectAuthenticationDomain, function (tokenData) {
  return tokenData && tokenData.get('lastTokens');
});
exports.selectLastTokens = selectLastTokens;

var makeSelectLastUserToken = function makeSelectLastUserToken(email) {
  return (0, _reselect.createSelector)(selectLastTokens, function (lastTokens) {
    return lastTokens && lastTokens.get((0, _utils.generateLastUserTokenKey)(email));
  });
};

exports.makeSelectLastUserToken = makeSelectLastUserToken;
var selectUser = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  var userData = authState.get('userData');
  return userData ? userData.toJS() : null;
});
exports.selectUser = selectUser;
var selectTokeIsValid = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.getIn(['tokenData', 'status']) === _constants.TOKEN_STATUS_VALID;
});
exports.selectTokeIsValid = selectTokeIsValid;
var selectTokeDataExists = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.has('tokenData');
});
exports.selectTokeDataExists = selectTokeDataExists;
var selectUserDataExists = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.has('userData');
});
exports.selectUserDataExists = selectUserDataExists;
var selectIsAuthenticated = (0, _reselect.createSelector)(selectTokeIsValid, selectUserDataExists, function (tokeIsValid, userDataExists) {
  return tokeIsValid && userDataExists;
});
exports.selectIsAuthenticated = selectIsAuthenticated;
var selectIsReady = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.get('isReady');
});
exports.selectIsReady = selectIsReady;