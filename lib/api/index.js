"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _apiClient = _interopRequireWildcard(require("api-client"));

function signIn(credentials) {
  var config = {
    headers: {
      Accept: 'application/json; version=2'
    }
  };
  return _apiClient["default"].post('/auth/login', credentials, config);
}

function extendTokenLifetime(token) {
  var config = {
    headers: {
      Authorization: "Token ".concat(token)
    }
  };
  return _apiClient["default"].post('/auth/token/extend-lifetime', {}, config);
}

function requestPasswordReset(payload) {
  return _apiClient["default"].post('/auth/reset-password', payload);
}

function resetPassword(payload) {
  return _apiClient["default"].post('/auth/reset-password-confirm', payload);
}

function signUp(payload) {
  return _apiClient["default"].post('/user/register', payload);
}

function signOut() {
  return _apiClient["default"].post('/auth/logout');
}

function twoFactorSendCode(token) {
  return _apiClient["default"].post('/auth/login/two-factor/send-code', {
    token: token
  });
}

function twoFactorConfirmCode(token, code) {
  var payload = {
    token: token,
    code: code
  };
  return _apiClient["default"].post('/auth/login/two-factor/confirm-code', payload);
}

function setAuthorizationTokenInHeaders(token) {
  (0, _apiClient.setHeaders)({
    Authorization: "Token ".concat(token)
  });
}

function removeAuthorizationTokenInHeaders() {
  delete _apiClient["default"].defaults.headers.Authorization;
}