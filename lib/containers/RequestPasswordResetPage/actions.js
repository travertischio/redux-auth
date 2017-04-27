'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestPasswordResetAction = requestPasswordResetAction;
exports.requestPasswordResetSucceedAction = requestPasswordResetSucceedAction;
exports.requestPasswordResetFailedAction = requestPasswordResetFailedAction;
exports.destroyPageAction = destroyPageAction;

var _constants = require('./constants');

function requestPasswordResetAction(requestPasswordPayload) {
  return {
    type: _constants.REQUEST_PASSWORD_RESET_ACTION,
    payload: requestPasswordPayload
  };
} /*
   *
   * RequestPasswordResetPage actions
   *
   */

function requestPasswordResetSucceedAction(response) {
  return {
    type: _constants.REQUEST_PASSWORD_RESET_SUCCEED_ACTION,
    payload: response
  };
}

function requestPasswordResetFailedAction(rejection) {
  return {
    type: _constants.REQUEST_PASSWORD_RESET_FAILED_ACTION,
    payload: rejection
  };
}

function destroyPageAction() {
  return {
    type: _constants.DESTROY_PAGE_ACTION
  };
}