"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = require("immutable");

var _constants = require("./constants");

/*
 *
 * RequestPasswordResetPage reducer
 *
 */
var initialState = (0, _immutable.fromJS)({});

function requestPasswordResetPageReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants.REQUEST_PASSWORD_RESET_ACTION:
      return onRequestPasswordResetAction(state);

    case _constants.REQUEST_PASSWORD_RESET_SUCCESS_ACTION:
      return onRequestPasswordResetSuccessAction(state);

    case _constants.REQUEST_PASSWORD_RESET_FAILED_ACTION:
      return onRequestPasswordResetFailedAction(state);

    case _constants.DESTROY_PAGE_ACTION:
      return onDestroyPageAction(state);

    default:
      return state;
  }
}

function onRequestPasswordResetAction(state) {
  return state.merge({
    loading: true,
    errorMessage: null,
    sent: false
  });
}

function onRequestPasswordResetSuccessAction(state) {
  return state.merge({
    loading: false,
    errorMessage: null,
    sent: true
  });
}

function onRequestPasswordResetFailedAction(state) {
  return state.merge({
    loading: false,
    errorMessage: 'serverErrorUnknown'
  });
}

function onDestroyPageAction() {
  return (0, _immutable.fromJS)({});
}

var _default = requestPasswordResetPageReducer;
exports["default"] = _default;