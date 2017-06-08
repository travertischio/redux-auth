/*
 *
 * SignInPage reducer
 *
 */

import { fromJS } from 'immutable';
import _isArray from 'lodash/isArray';
import {
  SIGN_IN_ACTION,
  SIGN_IN_SUCCESS_ACTION,
  SIGN_IN_FAILED_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

const initialState = fromJS({});

function signInPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_ACTION:
      return onSignInAction(state);
    case SIGN_IN_SUCCESS_ACTION:
      return onSignSuccessAction(state);
    case SIGN_IN_FAILED_ACTION:
      return onSignFailedAction(state, action.payload);
    case DESTROY_PAGE_ACTION:
      return onDestroyPageAction(state);
    default:
      return state;
  }
}

function onSignInAction(state) {
  return state.merge({
    loading: true,
    errorMessage: null,
  });
}

function onSignSuccessAction(state) {
  return state.merge({
    loading: false,
    errorMessage: null,
  });
}

function onSignFailedAction(state, rejection) {
  const { response } = rejection;
  let errorMessage = 'Unable to sign in. Please try again.';

  if (response && response.status === 400) {
    const nonFieldErrors = response.data.non_field_errors;

    if (_isArray(nonFieldErrors)) {
      errorMessage = nonFieldErrors.join(', ');
    }
  }

  return state.merge({
    loading: false,
    errorMessage,
  });
}

function onDestroyPageAction() {
  return fromJS({});
}

export default signInPageReducer;
