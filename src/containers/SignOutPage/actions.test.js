import {
  signOutAction,
  signOutFailedAction,
} from './actions';
import {
  SIGN_OUT_ACTION,
  SIGN_OUT_FAILED_ACTION,
} from './constants';

describe('SignOutPage actions', () => {
  it('signOutAction should return SIGN_OUT_ACTION type', () => {
    const expected = {
      type: SIGN_OUT_ACTION,
    };

    expect(signOutAction()).toEqual(expected);
  });

  it('signOutFailedAction should return SIGN_OUT_ACTION type', () => {
    const expected = {
      type: SIGN_OUT_FAILED_ACTION,
    };

    expect(signOutFailedAction()).toEqual(expected);
  });
});
