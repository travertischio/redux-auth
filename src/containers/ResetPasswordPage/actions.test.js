import {
  resetPasswordAction,
  resetPasswordSucceedAction,
  resetPasswordFailedAction,
  destroyPageAction,
} from './actions';
import {
  RESET_PASSWORD_ACTION,
  RESET_PASSWORD_SUCCEED_ACTION,
  RESET_PASSWORD_FAILED_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

describe('Authentication actions', () => {
  const payload = {};

  it('resetPasswordAction should return RESET_PASSWORD_ACTION type and payload', () => {
    const expected = {
      type: RESET_PASSWORD_ACTION,
      payload,
    };

    expect(resetPasswordAction(payload)).toEqual(expected);
  });

  it('resetPasswordSucceedAction should return RESET_PASSWORD_SUCCEED_ACTION type and payload', () => {
    const expected = {
      type: RESET_PASSWORD_SUCCEED_ACTION,
      payload,
    };

    expect(resetPasswordSucceedAction(payload)).toEqual(expected);
  });

  it('resetPasswordFailedAction should return RESET_PASSWORD_FAILED_ACTION type and payload', () => {
    const expected = {
      type: RESET_PASSWORD_FAILED_ACTION,
      payload,
    };

    expect(resetPasswordFailedAction(payload)).toEqual(expected);
  });

  it('destroyPageAction should return DESTROY_PAGE_ACTION type', () => {
    const expected = {
      type: DESTROY_PAGE_ACTION,
    };

    expect(destroyPageAction()).toEqual(expected);
  });
});
