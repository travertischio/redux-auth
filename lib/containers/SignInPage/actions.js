"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signInAction = signInAction;
exports.signInSuccessAction = signInSuccessAction;
exports.signInFailedAction = signInFailedAction;
exports.destroyPageAction = destroyPageAction;

var _constants = require("./constants");

/*
 *
 * SignInPage actions
 *
 */
function signInAction(credentials) {
  return {
    type: _constants.SIGN_IN_ACTION,
    credentials: credentials
  };
}

function signInSuccessAction(response) {
  return {
    type: _constants.SIGN_IN_SUCCESS_ACTION,
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