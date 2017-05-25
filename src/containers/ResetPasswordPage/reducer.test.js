import { fromJS } from 'immutable';
import resetPasswordPageReducer from './reducer';
import {
  resetPasswordAction,
  resetPasswordSucceedAction,
  resetPasswordFailedAction,
  destroyPageAction,
} from './actions';

describe('resetPasswordPageReducer', () => {
  let currentState;

  it('returns the initial state', () => {
    const expectedState = fromJS({});
    currentState = resetPasswordPageReducer(undefined, {});
    expect(currentState).toEqual(expectedState);
  });

  describe('when call with the RESET_PASSWORD_ACTION action', () => {
    beforeEach(() => {
      currentState = resetPasswordPageReducer(currentState, resetPasswordAction());
    });

    it('should update state', () => {
      const expectedState = currentState.merge({
        loading: true,
        errorMessage: null,
        success: false,
      });
      expect(currentState.toJS()).toEqual(expectedState.toJS());
    });

    describe('when call with the RESET_PASSWORD_SUCCEED_ACTION action', () => {
      beforeEach(() => {
        currentState = resetPasswordPageReducer(currentState, resetPasswordSucceedAction());
      });

      it('should update state', () => {
        const expectedState = currentState.merge({
          loading: false,
          errorMessage: null,
          success: true,
        });
        expect(currentState.toJS()).toEqual(expectedState.toJS());
      });
    });

    describe('when call with the RESET_PASSWORD_FAILED_ACTION action', () => {
      const rejection = {
        response: {
          data: {
            new_password: ['WRONG_PASSWORD_8_CHARS_AND_NUMBER'],
          },
        },
      };

      beforeEach(() => {
        currentState = resetPasswordPageReducer(currentState, resetPasswordFailedAction(rejection));
      });

      it('should update state', () => {
        const expectedState = currentState.merge({
          loading: false,
          errorMessage: 'serverErrorWrongPassword8CharsAndNumber',
          invalidToken: false,
        });
        expect(currentState.toJS()).toEqual(expectedState.toJS());
      });
    });

    describe('when call with the RESET_PASSWORD_FAILED_ACTION action', () => {
      const rejection = {
        response: {
          data: {
            non_field_errors: ['SOME_ERROR'],
          },
        },
      };

      beforeEach(() => {
        currentState = resetPasswordPageReducer(currentState, resetPasswordFailedAction(rejection));
      });

      it('should update state', () => {
        const expectedState = currentState.merge({
          loading: false,
          errorMessage: 'serverErrorSomeError',
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
