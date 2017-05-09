import { fromJS } from 'immutable';
import resetPasswordPageReducer from './reducer';
import {
  signInAction,
  signInSucceedAction,
  signInFailedAction,
  destroyPageAction,
} from './actions';

describe('resetPasswordPageReducer', () => {
  let currentState;

  it('returns the initial state', () => {
    const expectedState = fromJS({});
    currentState = resetPasswordPageReducer(undefined, {});
    expect(currentState).toEqual(expectedState);
  });

  describe('when call with the SIGN_IN_ACTION action', () => {
    beforeEach(() => {
      currentState = resetPasswordPageReducer(currentState, signInAction());
    });

    it('should update state', () => {
      const expectedState = currentState.merge({
        loading: true,
        errorMessage: false,
      });
      expect(currentState.toJS()).toEqual(expectedState.toJS());
    });

    describe('when call with the SIGN_IN_SUCCEED_ACTION action', () => {
      beforeEach(() => {
        currentState = resetPasswordPageReducer(currentState, signInSucceedAction());
      });

      it('should update state', () => {
        const expectedState = currentState.merge({
          loading: false,
          errorMessage: false,
        });
        expect(currentState.toJS()).toEqual(expectedState.toJS());
      });
    });

    describe('when call with the SIGN_IN_FAILED_ACTION action', () => {
      const rejection = {
        response: {
          status: 400,
          data: {
            non_field_errors: ['Unable to log in with provided credentials.'],
          },
        },
      };

      beforeEach(() => {
        currentState = resetPasswordPageReducer(currentState, signInFailedAction(rejection));
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
        currentState = resetPasswordPageReducer(currentState, signInFailedAction(rejection));
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
          currentState = resetPasswordPageReducer(currentState, destroyPageAction());
        });

        it('should clear state', () => {
          const expectedState = fromJS({});
          expect(currentState.toJS()).toEqual(expectedState.toJS());
        });
      });
    });
  });
});
