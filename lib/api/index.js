'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = signIn;
exports.refreshToken = refreshToken;
exports.requestPasswordReset = requestPasswordReset;
exports.resetPassword = resetPassword;
exports.signUp = signUp;
exports.signOut = signOut;
exports.setAuthorizationTokenInHeaders = setAuthorizationTokenInHeaders;
exports.removeAuthorizationTokenInHeaders = removeAuthorizationTokenInHeaders;

var _apiClient = require('api-client');

var _apiClient2 = _interopRequireDefault(_apiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signIn(credentials) {
  var config = {
    headers: { Accept: 'application/json; version=2' }
  };
  return _apiClient2.default.post('/auth/login', credentials, config);
}

function refreshToken(permanentToken) {
  var config = {
    headers: { 'Permanent-Token': permanentToken }
  };
  return _apiClient2.default.post('/auth/9743a66f914cc249efca164485a19c5c', {}, config);
}

function requestPasswordReset(payload) {
  return _apiClient2.default.post('/auth/reset-password', payload);
}

function resetPassword(payload) {
  return _apiClient2.default.post('/auth/reset-password-confirm', payload);
}

function signUp(payload) {
  return _apiClient2.default.post('/user/register', payload);
}

function signOut(deviceId) {
  var config = {
    headers: { 'Device-Id': deviceId }
  };

  return _apiClient2.default.delete('/auth/logout', config);
}

function setAuthorizationTokenInHeaders(token) {
  (0, _apiClient.setHeaders)({
    Authorization: 'JWT ' + token
  });
}

function removeAuthorizationTokenInHeaders() {
  delete _apiClient2.default.defaults.headers.Authorization;
}