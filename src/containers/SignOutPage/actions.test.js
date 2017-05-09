import {
  signOutAction,
} from './actions';
import {
  SIGN_OUT_ACTION,
} from './constants';

describe('Authentication actions', () => {
  it('signOutAction should return SIGN_OUT_ACTION type', () => {
    const expected = {
      type: SIGN_OUT_ACTION,
    };

    expect(signOutAction()).toEqual(expected);
  });
});
