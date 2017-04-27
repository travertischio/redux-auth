'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpFailedAction = exports.signUpSucceedAction = exports.signUpAction = undefined;

var _constants = require('./constants');

var signUpAction = exports.signUpAction = function signUpAction(userData) {
  return {
    type: _constants.SIGN_UP_ACTION,
    payload: userData
  };
}; /*
    *
    * SignUpPage actions
    *
    */

var signUpSucceedAction = exports.signUpSucceedAction = function signUpSucceedAction(response) {
  return {
    type: _constants.SIGN_UP_SUCCEED_ACTION,
    payload: response
  };
};

var signUpFailedAction = exports.signUpFailedAction = function signUpFailedAction(response) {
  return {
    type: _constants.SIGN_UP_FAILED_ACTION,
    payload: response
  };
};