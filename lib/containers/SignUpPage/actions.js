"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpFailedAction = exports.signUpSuccessAction = exports.signUpAction = void 0;

var _constants = require("./constants");

/*
 *
 * SignUpPage actions
 *
 */
var signUpAction = function signUpAction(userData, resolve, reject) {
  return {
    type: _constants.SIGN_UP_ACTION,
    payload: userData,
    resolve: resolve,
    reject: reject
  };
};

exports.signUpAction = signUpAction;

var signUpSuccessAction = function signUpSuccessAction(response) {
  return {
    type: _constants.SIGN_UP_SUCCESS_ACTION,
    payload: response
  };
};

exports.signUpSuccessAction = signUpSuccessAction;

var signUpFailedAction = function signUpFailedAction(response) {
  return {
    type: _constants.SIGN_UP_FAILED_ACTION,
    payload: response
  };
};

exports.signUpFailedAction = signUpFailedAction;