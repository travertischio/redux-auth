'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signInAction = signInAction;
exports.signInSucceedAction = signInSucceedAction;
exports.signInFailedAction = signInFailedAction;
exports.destroyPageAction = destroyPageAction;

var _constants = require('./constants');

function signInAction(credentials) {
  return {
    type: _constants.SIGN_IN_ACTION,
    payload: credentials
  };
} /*
   *
   * SignInPage actions
   *
   */

function signInSucceedAction(response) {
  return {
    type: _constants.SIGN_IN_SUCCEED_ACTION,
    payload: response
  };
}

function signInFailedAction(rejection) {
  return {
    type: _constants.SIGN_IN_FAILED_ACTION,
    payload: rejection
  };
}

function destroyPageAction() {
  return {
    type: _constants.DESTROY_PAGE_ACTION
  };
}