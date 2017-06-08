/*
 *
 * RequestPasswordResetPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REQUEST_PASSWORD_RESET_ACTION,
  REQUEST_PASSWORD_RESET_SUCCESS_ACTION,
  REQUEST_PASSWORD_RESET_FAILED_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

const initialState = fromJS({});

function requestPasswordResetPageReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PASSWORD_RESET_ACTION:
      return onRequestPasswordResetAction(state);
    case REQUEST_PASSWORD_RESET_SUCCESS_ACTION:
      return onRequestPasswordResetSuccessAction(state);
    case REQUEST_PASSWORD_RESET_FAILED_ACTION:
      return onRequestPasswordResetFailedAction(state);
    case DESTROY_PAGE_ACTION:
      return onDestroyPageAction(state);
    default:
      return state;
  }
}

function onRequestPasswordResetAction(state) {
  return state.merge({
    loading: true,
    errorMessage: null,
    sent: false,
  });
}

function onRequestPasswordResetSuccessAction(state) {
  return state.merge({
    loading: false,
    errorMessage: null,
    sent: true,
  });
}

function onRequestPasswordResetFailedAction(state) {
  return state.merge({
    loading: false,
    errorMessage: 'serverErrorUnknown',
  });
}

function onDestroyPageAction() {
  return fromJS({});
}

export default requestPasswordResetPageReducer;
