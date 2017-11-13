'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmCodeAction = confirmCodeAction;
exports.confirmCodeSuccessAction = confirmCodeSuccessAction;
exports.confirmCodeFailedAction = confirmCodeFailedAction;
exports.destroyPageAction = destroyPageAction;

var _constants = require('./constants');

function confirmCodeAction(payload) {
  return {
    type: _constants.CONFIRM_CODE_ACTION,
    payload: payload
  };
} /*
   *
   * SignInConfirmCodePage actions
   *
   */

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

function destroyPageAction() {
  return {
    type: _constants.DESTROY_PAGE_ACTION
  };
}