'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = signIn;
exports.extendTokenLifetime = extendTokenLifetime;
exports.requestPasswordReset = requestPasswordReset;
exports.resetPassword = resetPassword;
exports.signUp = signUp;
exports.signOut = signOut;
exports.twoFactorSendCode = twoFactorSendCode;
exports.twoFactorConfirmCode = twoFactorConfirmCode;
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

function extendTokenLifetime(token) {
  var config = {
    headers: { Authorization: 'Token ' + token }
  };
  return _apiClient2.default.post('/auth/token/extend-lifetime', {}, config);
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

function twoFactorSendCode(token) {
  return _apiClient2.default.post('/auth/login/two-factor/send-code', { token: token });
}

function twoFactorConfirmCode(token, code) {
  var payload = {
    token: token,
    code: code
  };

  return _apiClient2.default.post('/auth/login/two-factor/confirm-code', payload);
}

function setAuthorizationTokenInHeaders(token) {
  (0, _apiClient.setHeaders)({
    Authorization: 'Token ' + token
  });
}

function removeAuthorizationTokenInHeaders() {
  delete _apiClient2.default.defaults.headers.Authorization;
}