'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _camelCase2 = require('lodash/camelCase');

var _camelCase3 = _interopRequireDefault(_camelCase2);

var _upperFirst2 = require('lodash/upperFirst');

var _upperFirst3 = _interopRequireDefault(_upperFirst2);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _immutable.fromJS)({}); /*
                                                *
                                                * ResetPasswordPage reducer
                                                *
                                                */

function resetPasswordPageReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.RESET_PASSWORD_ACTION:
      return onResetPasswordAction(state);
    case _constants.RESET_PASSWORD_SUCCEED_ACTION:
      return onResetPasswordSucceedAction(state);
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
    errorMessage: false,
    success: false
  });
}

function onResetPasswordSucceedAction(state) {
  return state.merge({
    loading: false,
    errorMessage: false,
    success: true
  });
}

function onResetPasswordFailedAction(state, rejection) {
  var errors = rejection.response.data;
  var newPasswordError = (0, _get3.default)(errors, ['new_password', 0]);
  var errorMessage = (0, _get3.default)(errors, ['non_field_errors', 0]);
  var invalidToken = true;

  if (newPasswordError === 'WRONG_PASSWORD_8_CHARS_AND_NUMBER') {
    errorMessage = newPasswordError;
    invalidToken = false;
  }

  errorMessage = (0, _camelCase3.default)(errorMessage);
  errorMessage = (0, _upperFirst3.default)(errorMessage);
  errorMessage = 'serverError' + errorMessage;

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

exports.default = resetPasswordPageReducer;