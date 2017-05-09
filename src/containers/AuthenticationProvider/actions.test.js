import {
  setTokenAction,
  clearTokenAction,
  refreshTokenAction,
  markTokenAsRefreshedAction,
} from './actions';
import {
  SET_TOKEN_ACTION,
  CLEAR_TOKEN_ACTION,
  REFRESH_TOKEN_ACTION,
  MARK_TOKEN_AS_REFRESHED_ACTION,
} from './constants';

describe('Authentication actions', () => {
  it('setTokenAction should return SET_TOKEN_ACTION type and payload', () => {
    const payload = {};
    const expected = {
      type: SET_TOKEN_ACTION,
      payload,
    };

    expect(setTokenAction(payload)).toEqual(expected);
  });

  it('clearTokenAction should return CLEAR_TOKEN_ACTION type', () => {
    const expected = {
      type: CLEAR_TOKEN_ACTION,
    };

    expect(clearTokenAction()).toEqual(expected);
  });

  it('refreshTokenAction should return REFRESH_TOKEN_ACTION type', () => {
    const expected = {
      type: REFRESH_TOKEN_ACTION,
    };

    expect(refreshTokenAction()).toEqual(expected);
  });

  it('markTokenAsRefreshedAction should return SET_TOKEN_ACTION type', () => {
    const expected = {
      type: MARK_TOKEN_AS_REFRESHED_ACTION,
    };

    expect(markTokenAsRefreshedAction()).toEqual(expected);
  });
});