import { fromJS } from 'immutable';
import {
  blockedAccountAction,
  requireCaptchaAction,
} from '~/containers/AuthenticationProvider/actions';
import signInPageReducer from './reducer';
import {
  signInAction,
  signInSuccessAction,
  signInFailedAction,
  destroyPageAction,
} from './actions';

describe('signInPageReducer', () => {
  let currentState;

  it('returns the initial state', () => {
    const expectedState = fromJS({});
    currentState = signInPageReducer(undefined, {});
    expect(currentState).toEqual(expectedState);
  });

  describe('when call with the SIGN_IN_ACTION action', () => {
    beforeEach(() => {
      currentState = signInPageReducer(currentState, signInAction());
    });

    it('should update state', () => {
      const expectedState = currentState.merge({
        loading: true,
        errorMessage: null,
      });
      expect(currentState.toJS()).toEqual(expectedState.toJS());
    });

    describe('when call with the SIGN_IN_SUCCESS_ACTION action', () => {
      beforeEach(() => {
        currentState = signInPageReducer(currentState, signInSuccessAction());
      });

      it('should update state', () => {
        const expectedState = currentState.merge({
          loading: false,
          errorMessage: null,
        });
        expect(currentState.toJS()).toEqual(expectedState.toJS());
      });
    });

    describe('when call with the SIGN_IN_FAILED_ACTION action', () => {
      const rejection = {
        response: {
          status: 400,
          data: {
            nonFieldErrors: ['Unable to log in with provided credentials.'],
          },
        },
      };

      beforeEach(() => {
        currentState = signInPageReducer(currentState, signInFailedAction(rejection));
      });

      it('should update state', () => {
        const expectedState = currentState.merge({
          loading: false,
          errorMessage: 'Unable to log in with provided credentials.',
        });
        expect(currentState.toJS()).toEqual(expectedState.toJS());
      });
    });

    describe('when call with the SIGN_IN_FAILED_ACTION action', () => {
      const rejection = {
        response: {
          status: 500,
        },
      };

      beforeEach(() => {
        currentState = signInPageReducer(currentState, signInFailedAction(rejection));
      });

      it('should update state', () => {
        const expectedState = currentState.merge({
          loading: false,
          errorMessage: 'Unable to sign in. Please try again.',
        });
        expect(currentState.toJS()).toEqual(expectedState.toJS());
      });

      describe('when call with the DESTROY_PAGE_ACTION action', () => {
        beforeEach(() => {
          currentState = signInPageReducer(currentState, destroyPageAction());
        });

        it('should clear state', () => {
          const expectedState = fromJS({});
          expect(currentState.toJS()).toEqual(expectedState.toJS());
        });
      });
    });

    describe('when call with the REQUIRE_CAPTCHA_ACTION action', () => {
      beforeEach(() => {
        currentState = signInPageReducer(currentState, requireCaptchaAction());
      });

      it('should update state', () => {
        const expectedState = currentState.merge({
          captchaRequired: true,
        });
        expect(currentState.toJS()).toEqual(expectedState.toJS());
      });

      describe('when call with the SIGN_IN_ACTION action', () => {
        beforeEach(() => {
          currentState = signInPageReducer(currentState, signInAction());
        });

        it('should update state', () => {
          const expectedState = currentState.merge({
            captchaRequired: false,
          });
          expect(currentState.toJS()).toEqual(expectedState.toJS());
        });
      });
    });

    describe('when call with the BLOCKED_ACCOUNT_ACTION action', () => {
      beforeEach(() => {
        currentState = signInPageReducer(currentState, blockedAccountAction());
      });

      it('should update state', () => {
        const expectedState = currentState.merge({
          blockedAccount: true,
        });
        expect(currentState.toJS()).toEqual(expectedState.toJS());
      });
    });
  });
});
