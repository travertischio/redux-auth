'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTokenAction = setTokenAction;
exports.setPermanentTokenAndDeviceIdAction = setPermanentTokenAndDeviceIdAction;
exports.clearTokenAction = clearTokenAction;
exports.refreshTokenAction = refreshTokenAction;
exports.markTokenAsRefreshedAction = markTokenAsRefreshedAction;
exports.redirectActionWithSupportParamInQueryString = redirectActionWithSupportParamInQueryString;

var _reactRouterRedux = require('react-router-redux');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setTokenAction(token) {
  return {
    type: _constants.SET_TOKEN_ACTION,
    payload: token
  };
} /*
   *
   * AuthenticationProvider actions
   *
   */
function setPermanentTokenAndDeviceIdAction(payload) {
  return {
    type: _constants.SET_PERMANENT_TOKEN_AND_DEVICE_ID_ACTION,
    payload: payload
  };
}

function clearTokenAction() {
  return {
    type: _constants.CLEAR_TOKEN_ACTION
  };
}

function refreshTokenAction() {
  return {
    type: _constants.REFRESH_TOKEN_ACTION
  };
}

function markTokenAsRefreshedAction() {
  return {
    type: _constants.MARK_TOKEN_AS_REFRESHED_ACTION
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