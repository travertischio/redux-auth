"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTokenDataAction = setTokenDataAction;
exports.clearTokenDataAction = clearTokenDataAction;
exports.markTokenAsInvalidAction = markTokenAsInvalidAction;
exports.extendTokenLifetimeAction = extendTokenLifetimeAction;
exports.markAuthenticationProviderAsReadyAction = markAuthenticationProviderAsReadyAction;
exports.setUserDataAction = setUserDataAction;
exports.clearUserDataAction = clearUserDataAction;
exports.twoFactorSendCodeAction = twoFactorSendCodeAction;
exports.twoFactorSendCodeSuccessAction = twoFactorSendCodeSuccessAction;
exports.twoFactorSendCodeFailedAction = twoFactorSendCodeFailedAction;
exports.redirectActionWithSupportParamInQueryString = redirectActionWithSupportParamInQueryString;
exports.signOutAction = signOutAction;
exports.signOutSuccessAction = signOutSuccessAction;
exports.signOutFailedAction = signOutFailedAction;
exports.setLastUserTokenAction = setLastUserTokenAction;
exports.requireCaptchaAction = requireCaptchaAction;
exports.blockedAccountAction = blockedAccountAction;
exports.failedAuthenticationResponseAction = failedAuthenticationResponseAction;
exports.successAuthenticationResponseAction = successAuthenticationResponseAction;

var _reactRouterRedux = require("react-router-redux");

var _queryString = _interopRequireDefault(require("query-string"));

var _constants = require("./constants");

/*
 *
 * AuthenticationProvider actions
 *
 */
function setTokenDataAction(tokenData) {
  return {
    type: _constants.SET_TOKEN_DATA_ACTION,
    tokenData: tokenData
  };
}

function clearTokenDataAction() {
  return {
    type: _constants.CLEAR_TOKEN_DATA_ACTION
  };
}

function markTokenAsInvalidAction() {
  return {
    type: _constants.MARK_TOKEN_AS_INVALID_ACTION
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
  var _queryString$parse = _queryString["default"].parse(window.location.search),
      redirect = _queryString$parse.redirect;

  if (redirect) {
    return _reactRouterRedux.routerActions.replace({
      pathname: redirect
    });
  }

  return _reactRouterRedux.routerActions.replace(action);
}

function signOutAction() {
  return {
    type: _constants.SIGN_OUT_ACTION
  };
}

function signOutSuccessAction() {
  return {
    type: _constants.SIGN_OUT_SUCCESS_ACTION
  };
}

function signOutFailedAction() {
  return {
    type: _constants.SIGN_OUT_FAILED_ACTION
  };
}

function setLastUserTokenAction(key, token) {
  return {
    type: _constants.SET_LAST_USER_TOKEN,
    key: key,
    token: token
  };
}

function requireCaptchaAction() {
  return {
    type: _constants.REQUIRE_CAPTCHA_ACTION
  };
}

function blockedAccountAction() {
  return {
    type: _constants.BLOCKED_ACCOUNT_ACTION
  };
}

function failedAuthenticationResponseAction(error) {
  return {
    type: _constants.FAILED_AUTHENTICATION_RESPONSE_ACTION,
    error: error
  };
}

function successAuthenticationResponseAction(response) {
  return {
    type: _constants.SUCCESS_AUTHENTICATION_RESPONSE_ACTION,
    response: response
  };
}