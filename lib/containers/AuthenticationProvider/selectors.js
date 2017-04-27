'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectTokenFromActionPayload = exports.makeSelectHasTokenRefreshed = exports.makeSelectUser = exports.makeSelectIsAuthenticated = exports.makeSelecTokenExpiryTime = exports.makeSelectToken = exports.selectAuthenticationDomain = undefined;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _reselect = require('reselect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Direct selector to the authentication state domain
 */
var selectAuthenticationDomain = function selectAuthenticationDomain(state) {
  return state.get('auth');
};

var makeSelectToken = function makeSelectToken() {
  return (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
    return authState.get('token');
  });
};

var makeSelecTokenExpiryTime = function makeSelecTokenExpiryTime() {
  return (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
    return authState.get('tokenExpiryTime');
  });
};

var makeSelectIsAuthenticated = function makeSelectIsAuthenticated() {
  return (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
    return authState.get('isAuthenticated');
  });
};

var makeSelectUser = function makeSelectUser() {
  return (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
    var user = authState.get('user');
    return user ? user.toJS() : null;
  });
};

var makeSelectHasTokenRefreshed = function makeSelectHasTokenRefreshed() {
  return (0, _reselect.createSelector)(selectAuthenticationDomain, function (authState) {
    return authState.get('hasTokenRefreshed');
  });
};

var makeSelectAuthentication = function makeSelectAuthentication() {
  return (0, _reselect.createSelector)(selectAuthenticationDomain, function (substate) {
    return substate.toJS();
  });
};

var selectTokenFromActionPayload = function selectTokenFromActionPayload(action) {
  return (0, _get3.default)(action, ['payload', 'data', 'token']);
};

exports.default = makeSelectAuthentication;
exports.selectAuthenticationDomain = selectAuthenticationDomain;
exports.makeSelectToken = makeSelectToken;
exports.makeSelecTokenExpiryTime = makeSelecTokenExpiryTime;
exports.makeSelectIsAuthenticated = makeSelectIsAuthenticated;
exports.makeSelectUser = makeSelectUser;
exports.makeSelectHasTokenRefreshed = makeSelectHasTokenRefreshed;
exports.selectTokenFromActionPayload = selectTokenFromActionPayload;