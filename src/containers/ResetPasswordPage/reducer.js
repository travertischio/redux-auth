/*
 *
 * ResetPasswordPage reducer
 *
 */

import { fromJS } from 'immutable';
import _get from 'lodash/get';
import _camelCase from 'lodash/camelCase';
import _upperFirst from 'lodash/upperFirst';
import {
  RESET_PASSWORD_ACTION,
  RESET_PASSWORD_SUCCESS_ACTION,
  RESET_PASSWORD_FAILED_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

const initialState = fromJS({});

function resetPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_ACTION:
      return onResetPasswordAction(state);
    case RESET_PASSWORD_SUCCESS_ACTION:
      return onResetPasswordSuccessAction(state);
    case RESET_PASSWORD_FAILED_ACTION:
      return onResetPasswordFailedAction(state, action.payload);
    case DESTROY_PAGE_ACTION:
      return onDestroyPageAction(state);
    default:
      return state;
  }
}

function onResetPasswordAction(state) {
  return state.merge({
    loading: true,
    errorMessage: null,
    success: false,
  });
}

function onResetPasswordSuccessAction(state) {
  return state.merge({
    loading: false,
    errorMessage: null,
    success: true,
  });
}

function onResetPasswordFailedAction(state, rejection) {
  const errors = rejection.response.data;
  const newPasswordError = _get(errors, ['new_password', 0]);
  let errorMessage = _get(errors, ['non_field_errors', 0]);
  let invalidToken = true;

  if (newPasswordError === 'WRONG_PASSWORD_8_CHARS_AND_NUMBER') {
    errorMessage = newPasswordError;
    invalidToken = false;
  }

  errorMessage = _camelCase(errorMessage);
  errorMessage = _upperFirst(errorMessage);
  errorMessage = `serverError${errorMessage}`;

  return state.merge({
    loading: false,
    success: false,
    errorMessage,
    invalidToken,
  });
}

function onDestroyPageAction() {
  return fromJS({});
}

export default resetPasswordPageReducer;
