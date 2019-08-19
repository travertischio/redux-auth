"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = require("immutable");

var _get2 = _interopRequireDefault(require("lodash/get"));

var _camelCase2 = _interopRequireDefault(require("lodash/camelCase"));

var _upperFirst2 = _interopRequireDefault(require("lodash/upperFirst"));

var _constants = require("./constants");

/*
 *
 * ResetPasswordPage reducer
 *
 */
var initialState = (0, _immutable.fromJS)({});

function resetPasswordPageReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants.RESET_PASSWORD_ACTION:
      return onResetPasswordAction(state);

    case _constants.RESET_PASSWORD_SUCCESS_ACTION:
      return onResetPasswordSuccessAction(state);

    case _constants.RESET_PASSWORD_FAILED_ACTION:
      return onResetPasswordFailedAction(state, action.payload);

    case _constants.DESTROY_PAGE_ACTION:
      return onDestroyPageAction(state);

    default:
      return state;
  }
}

function onResetPasswordAction(state) {
  return state.merge({
    loading: true,
    errorMessage: null,
    success: false
  });
}

function onResetPasswordSuccessAction(state) {
  return state.merge({
    loading: false,
    errorMessage: null,
    success: true
  });
}

function onResetPasswordFailedAction(state, rejection) {
  var errors = rejection.response.data;
  var newPasswordError = (0, _get2["default"])(errors, ['new_password', 0]);
  var errorMessage = (0, _get2["default"])(errors, ['non_field_errors', 0]);
  var invalidToken = true;

  if (newPasswordError === 'WRONG_PASSWORD_8_CHARS_AND_NUMBER') {
    errorMessage = newPasswordError;
    invalidToken = false;
  }

  errorMessage = (0, _camelCase2["default"])(errorMessage);
  errorMessage = (0, _upperFirst2["default"])(errorMessage);
  errorMessage = "serverError".concat(errorMessage);
  return state.merge({
    loading: false,
    success: false,
    errorMessage: errorMessage,
    invalidToken: invalidToken
  });
}

function onDestroyPageAction() {
  return (0, _immutable.fromJS)({});
}

var _default = resetPasswordPageReducer;
exports["default"] = _default;