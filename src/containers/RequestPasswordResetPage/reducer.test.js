import { fromJS } from 'immutable';
import requestPasswordResetPageReducer from './reducer';
import {
  requestPasswordResetAction,
  requestPasswordResetSucceedAction,
  requestPasswordResetFailedAction,
  destroyPageAction,
} from './actions';

describe('requestPasswordResetPageReducer', () => {
  let currentState;

  it('returns the initial state', () => {
    const expectedState = fromJS({});
    currentState = requestPasswordResetPageReducer(undefined, {});
    expect(currentState).toEqual(expectedState);
  });

  describe('when call with the REQUEST_PASSWORD_RESET_ACTION action', () => {
    beforeEach(() => {
      currentState = requestPasswordResetPageReducer(currentState, requestPasswordResetAction());
    });

    it('should update state', () => {
      const expectedState = currentState.merge({
        loading: true,
        errorMessage: null,
        sent: false,
      });
      expect(currentState.toJS()).toEqual(expectedState.toJS());
    });

    describe('when call with the REQUEST_PASSWORD_RESET_SUCCEED_ACTION action', () => {
      beforeEach(() => {
        currentState = requestPasswordResetPageReducer(currentState, requestPasswordResetSucceedAction());
      });

      it('should update state', () => {
        const expectedState = currentState.merge({
          loading: false,
          errorMessage: null,
          sent: true,
        });
        expect(currentState.toJS()).toEqual(expectedState.toJS());
      });
    });

    describe('when call with the REQUEST_PASSWORD_RESET_FAILED_ACTION action', () => {
      beforeEach(() => {
        currentState = requestPasswordResetPageReducer(currentState, requestPasswordResetFailedAction());
      });

      it('should update state', () => {
        const expectedState = currentState.merge({
          loading: false,
          errorMessage: 'serverErrorUnknown',
        });
        expect(currentState.toJS()).toEqual(expectedState.toJS());
      });

      describe('when call with the DESTROY_PAGE_ACTION action', () => {
        beforeEach(() => {
          currentState = requestPasswordResetPageReducer(currentState, destroyPageAction());
        });

        it('should clear state', () => {
          const expectedState = fromJS({});
          expect(currentState.toJS()).toEqual(expectedState.toJS());
        });
      });
    });
  });
});
