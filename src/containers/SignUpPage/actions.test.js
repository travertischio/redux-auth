import {
  signUpAction,
  signUpSuccessAction,
  signUpFailedAction,
} from './actions';
import {
  SIGN_UP_ACTION,
  SIGN_UP_SUCCESS_ACTION,
  SIGN_UP_FAILED_ACTION,
} from './constants';

describe('SignUpPage actions', () => {
  const payload = {
    string: 'STRING',
    number: 1,
    object: {},
  };

  it('signUpAction should return SIGN_UP_ACTION type and payload', () => {
    const expected = {
      type: SIGN_UP_ACTION,
      payload,
    };

    expect(signUpAction(payload)).toEqual(expected);
  });

  it('signUpAction should return SIGN_UP_SUCCESS_ACTION type and payload', () => {
    const expected = {
      type: SIGN_UP_SUCCESS_ACTION,
      payload,
    };

    expect(signUpSuccessAction(payload)).toEqual(expected);
  });

  it('signUpAction should return SIGN_UP_FAILED_ACTION type and payload', () => {
    const expected = {
      type: SIGN_UP_FAILED_ACTION,
      payload,
    };

    expect(signUpFailedAction(payload)).toEqual(expected);
  });
});
