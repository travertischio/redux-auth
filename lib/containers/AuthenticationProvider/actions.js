'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTokenDataAction = setTokenDataAction;
exports.clearTokenDataAction = clearTokenDataAction;
exports.extendTokenLifetimeAction = extendTokenLifetimeAction;
exports.markAuthenticationProviderAsReadyAction = markAuthenticationProviderAsReadyAction;
exports.setUserDataAction = setUserDataAction;
exports.clearUserDataAction = clearUserDataAction;
exports.twoFactorSendCodeAction = twoFactorSendCodeAction;
exports.twoFactorSendCodeSuccessAction = twoFactorSendCodeSuccessAction;
exports.twoFactorSendCodeFailedAction = twoFactorSendCodeFailedAction;
exports.redirectActionWithSupportParamInQueryString = redirectActionWithSupportParamInQueryString;

var _reactRouterRedux = require('react-router-redux');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setTokenDataAction(tokenData) {
  return {
    type: _constants.SET_TOKEN_DATA_ACTION,
    tokenData: tokenData
  };
} /*
   *
   * AuthenticationProvider actions
   *
   */
function clearTokenDataAction() {
  return {
    type: _constants.CLEAR_TOKEN_DATA_ACTION
  };
}

function extendTokenLifetimeAction() {
  return {
    type: _constants.EXTEND_TOKEN_LIFETIME_ACTION
  };
}

function markAuthenticationProviderAsReadyAction() {
  return {
    type: _constants.MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION
  };
}

function setUserDataAction(userData) {
  return {
    type: _constants.SET_USER_DATA_ACTION,
    userData: userData
  };
}

function clearUserDataAction() {
  return {
    type: _constants.CLEAR_USER_DATA_ACTION
  };
}

function twoFactorSendCodeAction(token) {
  return {
    type: _constants.TWO_FACTOR_SEND_CODE_ACTION,
    token: token
  };
}

function twoFactorSendCodeSuccessAction() {
  return {
    type: _constants.TWO_FACTOR_SEND_CODE_SUCCESS_ACTION
  };
}

function twoFactorSendCodeFailedAction(error) {
  return {
    type: _constants.TWO_FACTOR_SEND_CODE_FAILED_ACTION,
    error: error
  };
}

function redirectActionWithSupportParamInQueryString(action) {
  var _queryString$parse = _queryString2.default.parse(location.search),
      redirect = _queryString$parse.redirect;

  if (redirect) {
    return _reactRouterRedux.routerActions.replace({
      pathname: redirect
    });
  }

  return _reactRouterRedux.routerActions.replace(action);
}