import { fromJS } from 'immutable';
import * as MockDate from 'mockdate';
import authenticationReducer from './reducer';
import {
  getEmptyStateData,
  getStateDataFromToken,
  setAuthDataInStorage,
} from './utils';
import {
  setTokenAction,
  setPermanentTokenAndDeviceIdAction,
  clearTokenAction,
  markTokenAsRefreshedAction,
  refreshTokenAction,
} from './actions';

describe('authenticationReducer', () => {
  const permanentToken = '1cfbe9a1cf13xeedf1a2fc784xb7caf8a95cd48a';
  const deviceId = 5342;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlYW1AYXJhYmVsLmxhIiwib3JpZ19pYXQiOjE0OTIwMTAwNzYsInVzZXIiOnsiZmlyc3RfbmFtZSI6InRlYW0iLCJsYXN0X25hbWUiOiJhcmFiZWxsYSB0ZXN0IiwiYXZhdGFyIjpudWxsLCJlbWFpbCI6InRlYW1AYXJhYmVsLmxhIiwiaWQiOjF9LCJleHAiOjE0OTIwMTAzNzYsInVzZXJfaWQiOjEsImVtYWlsIjoidGVhbUBhcmFiZWwubGEifQ.hRSOsGt-Q6amkh2oJS2ZqHsESQA7fZ_qRgFYME5qTw8';
  let currentState;

  it('returns the initial state', () => {
    const expectedState = fromJS(getEmptyStateData());

    currentState = authenticationReducer(undefined, {});

    expect(currentState).toEqual(expectedState);
  });

  it('should return the same state when refresh token occurs', () => {
    const action = refreshTokenAction();

    expect(currentState).toEqual(authenticationReducer(currentState, action));
  });

  it('should set hasTokenRefreshed to true when set token action occurs', () => {
    const expectedState = currentState.set('hasTokenRefreshed', true);
    const action = markTokenAsRefreshedAction();

    currentState = authenticationReducer(currentState, action);

    expect(currentState).toEqual(expectedState);
  });

  describe('when the token is saved in the local storage', () => {
    beforeEach(() => {
      setAuthDataInStorage({
        permanentToken,
        deviceId,
        token,
      });

      currentState = authenticationReducer(undefined, {});
    });

    it('should a initial state has permanentToken', () => {
      currentState = authenticationReducer(undefined, {});

      expect(currentState.get('permanentToken')).toEqual(permanentToken);
    });

    it('should a initial state has deviceId', () => {
      currentState = authenticationReducer(undefined, {});

      expect(currentState.get('deviceId')).toEqual(deviceId);
    });

    it('should a initial state has token', () => {
      currentState = authenticationReducer(undefined, {});

      expect(currentState.get('token')).toEqual(token);
    });
  });

  describe('when set permanent token and device id action occurs', () => {
    beforeEach(() => {
      const action = setPermanentTokenAndDeviceIdAction({
        permanentToken,
        deviceId,
      });
      const now = 1492090098140;

      MockDate.set(now);
      currentState = authenticationReducer(currentState, action);
    });

    afterEach(() => {
      MockDate.reset();
    });

    it('should set permanent token', () => {
      expect(currentState.get('permanentToken')).toEqual(permanentToken);
    });

    it('should set deviceId', () => {
      expect(currentState.get('deviceId')).toEqual(deviceId);
    });

    describe('when set token action occurs', () => {
      beforeEach(() => {
        const action = setTokenAction(token);

        currentState = authenticationReducer(currentState, action);
      });

      it('should set state data generated from token by getStateDataFromToken', () => {
        const receivedState = currentState.toJS();
        const expectedState = getStateDataFromToken(token).toJS();

        expectedState.permanentToken = permanentToken;
        expectedState.deviceId = deviceId;

        expect(receivedState).toEqual(expectedState);
      });

      describe('when clear token action occurs', () => {
        beforeEach(() => {
          const action = clearTokenAction();

          currentState = authenticationReducer(currentState, action);
        });

        it('should set empty state data generated by getEmptyStateData', () => {
          let expectedState = fromJS(getEmptyStateData());

          expectedState = expectedState
            .delete('tokenExpiryTime')
            .set('hasTokenRefreshed', true);

          expect(currentState).toEqual(expectedState);
        });
      });
    });
  });
});
