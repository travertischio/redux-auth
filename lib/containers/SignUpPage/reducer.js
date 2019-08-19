"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.onSignUpFailedAction = exports.onSignUpSuccessAction = exports.onSignUpAction = void 0;

var _immutable = require("immutable");

var _constants = require("./constants");

/*
 *
 * SignUpPage reducer
 *
 */
var initialState = (0, _immutable.fromJS)({});

function signUpPageReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants.SIGN_UP_ACTION:
      return onSignUpAction(state);

    case _constants.SIGN_UP_SUCCESS_ACTION:
      return onSignUpSuccessAction(state);

    case _constants.SIGN_UP_FAILED_ACTION:
      return onSignUpFailedAction(state, action.payload);

    default:
      return state;
  }
}

var onSignUpAction = function onSignUpAction(state) {
  return state.merge({
    loading: true,
    errorMessage: null
  });
};

exports.onSignUpAction = onSignUpAction;

var onSignUpSuccessAction = function onSignUpSuccessAction(state) {
  return state.merge({
    loading: false,
    errorMessage: null
  });
};

exports.onSignUpSuccessAction = onSignUpSuccessAction;

var onSignUpFailedAction = function onSignUpFailedAction(state, rejection) {
  var response = rejection.response;
  var errorMessage = 'Ooops, something went wrong, please try again later.';

  if (response.status === 400) {
    errorMessage = response.data.non_field_errors;
  }

  return state.merge({
    loading: false,
    errorMessage: errorMessage
  });
};

exports.onSignUpFailedAction = onSignUpFailedAction;
var _default = signUpPageReducer;
exports["default"] = _default;