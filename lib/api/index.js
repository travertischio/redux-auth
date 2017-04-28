'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = signIn;
exports.refreshToken = refreshToken;
exports.requestPasswordReset = requestPasswordReset;
exports.resetPassword = resetPassword;
exports.signUp = signUp;

var _axios = require('axios');

var axios = _interopRequireWildcard(_axios);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// TODO move it to global settings
var API_HOST = 'https://demo-api-dev.arabel.la';

function signIn(credentials) {
  var endPoint = API_HOST + '/api/auth/login';
  var config = {
    headers: { Accept: 'application/json; version=2' }
  };
  return axios.post(endPoint, credentials, config);
}

function refreshToken(token) {
  var endPoint = API_HOST + '/api/auth/9743a66f914cc249efca164485a19c5c';
  var payload = { token: token };
  return axios.post(endPoint, payload);
}

function requestPasswordReset(payload) {
  var endPoint = API_HOST + '/api/auth/reset-password';
  return axios.post(endPoint, payload);
}

function resetPassword(payload) {
  var endPoint = API_HOST + '/api/auth/reset-password-confirm';
  return axios.post(endPoint, payload);
}

function signUp(payload) {
  var endPoint = API_HOST + '/api/user/register';
  return axios.post(endPoint, payload);
}