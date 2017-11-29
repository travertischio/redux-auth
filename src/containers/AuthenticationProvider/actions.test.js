import {
  setTokenDataAction,
  clearTokenDataAction,
  markTokenAsInvalidAction,
  extendTokenLifetimeAction,
  markAuthenticationProviderAsReadyAction,
  setUserDataAction,
  clearUserDataAction,
  redirectActionWithSupportParamInQueryString,
  signOutAction,
  signOutSuccessAction,
  signOutFailedAction,
} from './actions';
import {
  SET_TOKEN_DATA_ACTION,
  CLEAR_TOKEN_DATA_ACTION,
  MARK_TOKEN_AS_INVALID_ACTION,
  EXTEND_TOKEN_LIFETIME_ACTION,
  MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION,
  SET_USER_DATA_ACTION,
  CLEAR_USER_DATA_ACTION,
  SIGN_OUT_ACTION,
  SIGN_OUT_SUCCESS_ACTION,
  SIGN_OUT_FAILED_ACTION,
} from './constants';

describe('Authentication actions', () => {
  it('setTokenDataAction should return SET_TOKEN_DATA_ACTION type and tokenData', () => {
    const tokenData = {};
    const expected = {
      type: SET_TOKEN_DATA_ACTION,
      tokenData,
    };

    expect(setTokenDataAction(tokenData)).toEqual(expected);
  });

  it('clearTokenDataAction should return CLEAR_TOKEN_DATA_ACTION type', () => {
    const expected = {
      type: CLEAR_TOKEN_DATA_ACTION,
    };

    expect(clearTokenDataAction()).toEqual(expected);
  });

  it('markTokenAsInvalidAction should return MARK_TOKEN_AS_INVALID_ACTION type', () => {
    const expected = {
      type: MARK_TOKEN_AS_INVALID_ACTION,
    };

    expect(markTokenAsInvalidAction()).toEqual(expected);
  });

  it('extendTokenLifetimeAction should return EXTEND_TOKEN_LIFETIME_ACTION type', () => {
    const expected = {
      type: EXTEND_TOKEN_LIFETIME_ACTION,
    };

    expect(extendTokenLifetimeAction()).toEqual(expected);
  });

  it('markAuthenticationProviderAsReadyAction should return MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION type', () => {
    const expected = {
      type: MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION,
    };

    expect(markAuthenticationProviderAsReadyAction()).toEqual(expected);
  });

  it('setUserDataAction should return SET_USER_DATA_ACTION type and payload', () => {
    const userData = {};
    const expected = {
      type: SET_USER_DATA_ACTION,
      userData,
    };

    expect(setUserDataAction(userData)).toEqual(expected);
  });

  it('clearUserDataAction should return CLEAR_USER_DATA_ACTION type', () => {
    const expected = {
      type: CLEAR_USER_DATA_ACTION,
    };

    expect(clearUserDataAction()).toEqual(expected);
  });

  it('redirectActionWithSupportParamInQueryString should return redirect action without changing argumnets if in location query string there is not redirect param', () => {
    const args = { pathname: '/home' };
    const action = {
      payload: {
        args: [args],
        method: 'replace',
      },
      type: '@@router/CALL_HISTORY_METHOD',
    };

    expect(redirectActionWithSupportParamInQueryString(args)).toEqual(action);
  });

  it('signOutAction should return SIGN_OUT_ACTION type', () => {
    const expected = {
      type: SIGN_OUT_ACTION,
    };

    expect(signOutAction()).toEqual(expected);
  });

  it('signOutFailedAction should return SIGN_OUT_SUCCESS_ACTION type', () => {
    const expected = {
      type: SIGN_OUT_SUCCESS_ACTION,
    };

    expect(signOutSuccessAction()).toEqual(expected);
  });

  it('signOutFailedAction should return SIGN_OUT_FAILED_ACTION type', () => {
    const expected = {
      type: SIGN_OUT_FAILED_ACTION,
    };

    expect(signOutFailedAction()).toEqual(expected);
  });
});
