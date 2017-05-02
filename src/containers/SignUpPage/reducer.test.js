import { fromJS } from 'immutable';
import {
  SIGN_UP_ACTION,
  SIGN_UP_SUCCEED_ACTION,
  SIGN_UP_FAILED_ACTION,
} from './constants';
import signUpPageReducer from './reducer';

describe('SignUpPage reducer', () => {
  describe('call with action: {}', () => {
    it('should return the initial state', () => {
      const initialState = fromJS({
        loading: false,
        errorMessage: false,
      });

      expect(signUpPageReducer(undefined, {})).toEqual(fromJS({}));
      expect(signUpPageReducer(initialState, {})).toEqual(initialState);
    });
  });

  describe('call with action: { type: SIGN_UP_ACTION }', () => {
    it('should return { loading: true, errorMessage: false }', () => {
      const initialState = fromJS({
        loading: false,
        errorMessage: true,
      });
      const received = signUpPageReducer(
        initialState,
        {
          type: SIGN_UP_ACTION,
        }
      );
      const expected = fromJS({
        loading: true,
        errorMessage: false,
      });

      expect(received).toEqual(expected);
    });
  });

  describe('call with action: { type: SIGN_UP_SUCCEED_ACTION }', () => {
    it('should return { loading: false, errorMessage: false }', () => {
      const initialState = fromJS({
        loading: true,
        errorMessage: true,
      });
      const received = signUpPageReducer(
        initialState,
        {
          type: SIGN_UP_SUCCEED_ACTION,
        }
      );
      const expected = fromJS({
        loading: false,
        errorMessage: false,
      });

      expect(received).toEqual(expected);
    });
  });

  describe('call with action: { type: SIGN_UP_FAILED_ACTION, payload }', () => {
    it('should return { loading: false, errorMessage: false } for payload.response.status !== 400', () => {
      const initialState = fromJS({
        loading: true,
      });
      const payload = {
        response: {},
      };
      const received = signUpPageReducer(
        initialState,
        {
          type: SIGN_UP_SUCCEED_ACTION,
          payload,
        }
      );
      const expected = fromJS({
        loading: false,
        errorMessage: false,
      });

      expect(received).toEqual(expected);
    });

    it('should return { loading: false, errorMessage: response.data.non_field_errors } for payload.response.status === 400', () => {
      const initialState = fromJS({
        loading: true,
      });
      const payload = {
        response: {
          status: 400,
          data: {
            non_field_errors: 'NON_FIELD_ERRORS',
          },
        },
      };
      const received = signUpPageReducer(
        initialState,
        {
          type: SIGN_UP_FAILED_ACTION,
          payload,
        },
        payload
      );
      const expected = fromJS({
        loading: false,
        errorMessage: 'NON_FIELD_ERRORS',
      });

      expect(received).toEqual(expected);
    });
  });
});
