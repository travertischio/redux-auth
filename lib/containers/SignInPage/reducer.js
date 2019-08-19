"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = require("immutable");

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _constants = require("../AuthenticationProvider/constants");

var _constants2 = require("./constants");

/*
 *
 * SignInPage reducer
 *
 */
var initialState = (0, _immutable.fromJS)({});

function signInPageReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants2.SIGN_IN_ACTION:
      return onSignInAction(state);

    case _constants2.SIGN_IN_SUCCESS_ACTION:
      return onSignSuccessAction(state);

    case _constants2.SIGN_IN_FAILED_ACTION:
      return onSignFailedAction(state, action.payload);

    case _constants2.DESTROY_PAGE_ACTION:
      return onDestroyPageAction(state);

    case _constants.BLOCKED_ACCOUNT_ACTION:
      return onBlockedAccountAction(state);

    case _constants.REQUIRE_CAPTCHA_ACTION:
      return onRequireCaptchaAction(state);

    default:
      return state;
  }
}

function onSignInAction(state) {
  return state.merge({
    loading: true,
    errorMessage: null,
    captchaRequired: false
  });
}

function onSignSuccessAction(state) {
  return state.merge({
    loading: false,
    errorMessage: null
  });
}

function onSignFailedAction(state, rejection) {
  var response = rejection.response;
  var errorMessage = 'Unable to sign in. Please try again.';

  if (response && response.status === 400) {
    var nonFieldErrors = response.data.nonFieldErrors;

    if ((0, _isArray2["default"])(nonFieldErrors)) {
      errorMessage = nonFieldErrors.join(', ');
    }
  }

  return state.merge({
    loading: false,
    errorMessage: errorMessage
  });
}

function onDestroyPageAction() {
  return (0, _immutable.fromJS)({});
}

function onBlockedAccountAction(state) {
  return state.set('blockedAccount', true);
}

function onRequireCaptchaAction(state) {
  return state.set('captchaRequired', true);
}

var _default = signInPageReducer;
exports["default"] = _default;