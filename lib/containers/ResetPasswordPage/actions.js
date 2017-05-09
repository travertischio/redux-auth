'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPasswordAction = resetPasswordAction;
exports.resetPasswordSucceedAction = resetPasswordSucceedAction;
exports.resetPasswordFailedAction = resetPasswordFailedAction;
exports.destroyPageAction = destroyPageAction;

var _constants = require('./constants');

function resetPasswordAction(newPasswordPayload) {
  return {
    type: _constants.RESET_PASSWORD_ACTION,
    payload: newPasswordPayload
  };
} /*
   *
   * ResetPasswordPage actions
   *
   */

function resetPasswordSucceedAction(response) {
  return {
    type: _constants.RESET_PASSWORD_SUCCEED_ACTION,
    payload: response
  };
}

function resetPasswordFailedAction(rejection) {
  return {
    type: _constants.RESET_PASSWORD_FAILED_ACTION,
    payload: rejection
  };
}

function destroyPageAction() {
  return {
    type: _constants.DESTROY_PAGE_ACTION
  };
}