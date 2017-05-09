'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectTokenFromActionPayload = exports.selectHasTokenRefreshed = exports.selectUser = exports.selectIsAuthenticated = exports.selectTokenExpiryTime = exports.selectToken = exports.selectAuthenticationDomain = undefined;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _reselect = require('reselect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectAuthenticationDomain = function selectAuthenticationDomain(state) {
  return state.get('auth');
};

var selectToken = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.get('token');
});

var selectTokenExpiryTime = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.get('tokenExpiryTime');
});

var selectIsAuthenticated = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.get('isAuthenticated');
});

var selectUser = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  var user = authState.get('user');
  return user ? user.toJS() : null;
});

var selectHasTokenRefreshed = (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
  return authState.get('hasTokenRefreshed');
});

var selectTokenFromActionPayload = function selectTokenFromActionPayload(action) {
  return (0, _get3.default)(action, ['payload', 'data', 'token']);
};

exports.selectAuthenticationDomain = selectAuthenticationDomain;
exports.selectToken = selectToken;
exports.selectTokenExpiryTime = selectTokenExpiryTime;
exports.selectIsAuthenticated = selectIsAuthenticated;
exports.selectUser = selectUser;
exports.selectHasTokenRefreshed = selectHasTokenRefreshed;
exports.selectTokenFromActionPayload = selectTokenFromActionPayload;