/*
 *
 * SignInPage reducer
 *
 */

import { fromJS } from 'immutable';
import _isArray from 'lodash/isArray';
import {
  BLOCKED_ACCOUNT_ACTION,
  REQUIRE_CAPTCHA_ACTION,
} from '~/containers/AuthenticationProvider/constants';
import {
  DESTROY_PAGE_ACTION,
  SIGN_IN_ACTION,
  SIGN_IN_FAILED_ACTION,
  SIGN_IN_SUCCESS_ACTION,
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
    case BLOCKED_ACCOUNT_ACTION:
      return onBlockedAccountAction(state);
    case REQUIRE_CAPTCHA_ACTION:
      return onRequireCaptchaAction(state);
    default:
      return state;
  }
}

function onSignInAction(state) {
  return state.merge({
    loading: true,
    errorMessage: null,
    captchaRequired: false,
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
    const { nonFieldErrors } = response.data;

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

function onBlockedAccountAction(state) {
  return state.set('blockedAccount', true);
}

function onRequireCaptchaAction(state) {
  return state.set('captchaRequired', true);
}

export default signInPageReducer;
