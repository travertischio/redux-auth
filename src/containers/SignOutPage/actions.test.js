
import {
  signOutAction,
} from './actions';
import {
  SIGN_OUT_ACTION,
} from './constants';

describe('SignOutPage actions', () => {
  describe('signOutAction', () => {
    it('has a type of SIGN_OUT_ACTION', () => {
      const expected = {
        type: SIGN_OUT_ACTION,
      };
      expect(signOutAction()).toEqual(expected);
    });
  });
});
