'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _immutable.fromJS)({}); /*
                                                *
                                                * SignInPage reducer
                                                *
                                                */

function signInPageReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.SIGN_IN_ACTION:
      return onSignInAction(state);
    case _constants.SIGN_IN_SUCCEED_ACTION:
      return onSignSucceedAction(state);
    case _constants.SIGN_IN_FAILED_ACTION:
      return onSignFailedAction(state, action.payload);
    case _constants.DESTROY_PAGE_ACTION:
      return onDestroyPageAction(state);
    default:
      return state;
  }
}

function onSignInAction(state) {
  return state.merge({
    loading: true,
    errorMessage: null
  });
}

function onSignSucceedAction(state) {
  return state.merge({
    loading: false,
    errorMessage: null
  });
}

function onSignFailedAction(state, rejection) {
  var response = rejection.response;

  var errorMessage = 'Unable to sign in. Please try again.';

  if (response && response.status === 400) {
    var nonFieldErrors = response.data.non_field_errors;

    if ((0, _isArray3.default)(nonFieldErrors)) {
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

exports.default = signInPageReducer;