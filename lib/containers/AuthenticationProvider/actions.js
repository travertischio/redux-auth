'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTokenAction = setTokenAction;
exports.clearTokenAction = clearTokenAction;
exports.refreshTokenAction = refreshTokenAction;
exports.markTokenAsRefreshedAction = markTokenAsRefreshedAction;

var _constants = require('./constants');

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