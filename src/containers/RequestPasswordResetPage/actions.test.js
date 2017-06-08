import {
  requestPasswordResetAction,
  requestPasswordResetSuccessAction,
  requestPasswordResetFailedAction,
  destroyPageAction,
} from './actions';
import {
  REQUEST_PASSWORD_RESET_ACTION,
  REQUEST_PASSWORD_RESET_SUCCESS_ACTION,
  REQUEST_PASSWORD_RESET_FAILED_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

describe('Authentication actions', () => {
  const payload = {};

  it('requestPasswordResetAction should return REQUEST_PASSWORD_RESET_ACTION type and payload', () => {
    const expected = {
      type: REQUEST_PASSWORD_RESET_ACTION,
      payload,
    };

    expect(requestPasswordResetAction(payload)).toEqual(expected);
  });

  it('requestPasswordResetSuccessAction should return REQUEST_PASSWORD_RESET_SUCCESS_ACTION type and payload', () => {
    const expected = {
      type: REQUEST_PASSWORD_RESET_SUCCESS_ACTION,
      payload,
    };

    expect(requestPasswordResetSuccessAction(payload)).toEqual(expected);
  });

  it('requestPasswordResetFailedAction should return REQUEST_PASSWORD_RESET_FAILED_ACTION type and payload', () => {
    const expected = {
      type: REQUEST_PASSWORD_RESET_FAILED_ACTION,
      payload,
    };

    expect(requestPasswordResetFailedAction(payload)).toEqual(expected);
  });

  it('destroyPageAction should return DESTROY_PAGE_ACTION type', () => {
    const expected = {
      type: DESTROY_PAGE_ACTION,
    };

    expect(destroyPageAction()).toEqual(expected);
  });
});
