"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmCodeAction = confirmCodeAction;
exports.confirmCodeSuccessAction = confirmCodeSuccessAction;
exports.confirmCodeFailedAction = confirmCodeFailedAction;

var _constants = require("./constants");

/*
 *
 * SignInConfirmCodePage actions
 *
 */
function confirmCodeAction(payload, resolve, reject) {
  return {
    type: _constants.CONFIRM_CODE_ACTION,
    payload: payload,
    resolve: resolve,
    reject: reject
  };
}

function confirmCodeSuccessAction(response) {
  return {
    type: _constants.CONFIRM_CODE_SUCCESS_ACTION,
    payload: response
  };
}

function confirmCodeFailedAction(rejection) {
  return {
    type: _constants.CONFIRM_CODE_FAILED_ACTION,
    payload: rejection
  };
}