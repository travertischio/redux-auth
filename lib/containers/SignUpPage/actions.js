'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpFailedAction = exports.signUpSuccessAction = exports.signUpAction = undefined;

var _constants = require('./constants');

var signUpAction = exports.signUpAction = function signUpAction(userData, resolve, reject) {
  return {
    type: _constants.SIGN_UP_ACTION,
    payload: userData,
    resolve: resolve,
    reject: reject
  };
}; /*
    *
    * SignUpPage actions
    *
    */

var signUpSuccessAction = exports.signUpSuccessAction = function signUpSuccessAction(response) {
  return {
    type: _constants.SIGN_UP_SUCCESS_ACTION,
    payload: response
  };
};

var signUpFailedAction = exports.signUpFailedAction = function signUpFailedAction(response) {
  return {
    type: _constants.SIGN_UP_FAILED_ACTION,
    payload: response
  };
};