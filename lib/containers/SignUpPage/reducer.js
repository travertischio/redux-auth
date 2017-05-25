'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onSignUpFailedAction = exports.onSignUpSucceedAction = exports.onSignUpAction = undefined;

var _immutable = require('immutable');

var _constants = require('./constants');

/*
 *
 * SignUpPage reducer
 *
 */
var initialState = (0, _immutable.fromJS)({});

function signUpPageReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.SIGN_UP_ACTION:
      return onSignUpAction(state);
    case _constants.SIGN_UP_SUCCEED_ACTION:
      return onSignUpSucceedAction(state);
    case _constants.SIGN_UP_FAILED_ACTION:
      return onSignUpFailedAction(state, action.payload);
    default:
      return state;
  }
}

var onSignUpAction = exports.onSignUpAction = function onSignUpAction(state) {
  return state.merge({
    loading: true,
    errorMessage: null
  });
};

var onSignUpSucceedAction = exports.onSignUpSucceedAction = function onSignUpSucceedAction(state) {
  return state.merge({
    loading: false,
    errorMessage: null
  });
};

// TODO handle field errors!
var onSignUpFailedAction = exports.onSignUpFailedAction = function onSignUpFailedAction(state, rejection) {
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

exports.default = signUpPageReducer;