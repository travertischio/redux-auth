import {
  signInAction,
  signInSuccessAction,
  signInFailedAction,
  destroyPageAction,
} from './actions';
import {
  SIGN_IN_ACTION,
  SIGN_IN_SUCCESS_ACTION,
  SIGN_IN_FAILED_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

describe('Authentication actions', () => {
  const payload = {};

  it('signInAction should return SIGN_IN_ACTION type and payload', () => {
    const expected = {
      type: SIGN_IN_ACTION,
      payload,
    };

    expect(signInAction(payload)).toEqual(expected);
  });

  it('signInSuccessAction should return SIGN_IN_SUCCESS_ACTION type and payload', () => {
    const expected = {
      type: SIGN_IN_SUCCESS_ACTION,
      payload,
    };

    expect(signInSuccessAction(payload)).toEqual(expected);
  });

  it('signInFailedAction should return SIGN_IN_FAILED_ACTION type and payload', () => {
    const expected = {
      type: SIGN_IN_FAILED_ACTION,
      payload,
    };

    expect(signInFailedAction(payload)).toEqual(expected);
  });

  it('destroyPageAction should return DESTROY_PAGE_ACTION type', () => {
    const expected = {
      type: DESTROY_PAGE_ACTION,
    };

    expect(destroyPageAction()).toEqual(expected);
  });
});
