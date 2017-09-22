'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signOutAction = signOutAction;
exports.signOutFailedAction = signOutFailedAction;

var _constants = require('./constants');

function signOutAction() {
  return {
    type: _constants.SIGN_OUT_ACTION
  };
} /*
   *
   * SignOutPage actions
   *
   */

function signOutFailedAction() {
  return {
    type: _constants.SIGN_OUT_FAILED_ACTION
  };
}