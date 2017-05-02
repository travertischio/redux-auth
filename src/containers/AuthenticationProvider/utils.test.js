import { Map } from 'immutable';
import * as MockDate from 'mockdate';
import isNumber from 'lodash/isNumber';
import { setTokenInStorage, getTokenFromStorage, removeTokenFromStorage, getStateDataFromToken, getEmptyStateData, calculateExpiryTime } from './utils';
import { TOKEN_KEY } from './constants';

describe('authentication utils', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlYW1AYXJhYmVsLmxhIiwib3JpZ19pYXQiOjE0OTIwMTAwNzYsInVzZXIiOnsiZmlyc3RfbmFtZSI6InRlYW0iLCJsYXN0X25hbWUiOiJhcmFiZWxsYSB0ZXN0IiwiYXZhdGFyIjpudWxsLCJlbWFpbCI6InRlYW1AYXJhYmVsLmxhIiwiaWQiOjF9LCJleHAiOjE0OTIwMTAzNzYsInVzZXJfaWQiOjEsImVtYWlsIjoidGVhbUBhcmFiZWwubGEifQ.hRSOsGt-Q6amkh2oJS2ZqHsESQA7fZ_qRgFYME5qTw8';
  const decodedToken = {
    username: 'team@arabel.la',
    orig_iat: 1492010076,
    user: {
      first_name: 'team',
      last_name: 'arabella test',
      avatar: null,
      email: 'team@arabel.la',
      id: 1,
    },
    exp: 1492010376,
    user_id: 1,
    email: 'team@arabel.la',
  };
  const emptyStateData = {
    isAuthenticated: false,
    hasTokenRefreshed: false,
    user: null,
    token: null,
  };

  describe('when calling setTokenInStorage(token)', () => {
    let result;

    beforeEach(() => {
      result = setTokenInStorage(token);
    });

    it('should set a token in a localStorage ', () => {
      const tokenFromLocalStorage = localStorage.getItem(TOKEN_KEY);
      expect(tokenFromLocalStorage).toEqual(token);
    });

    it('should returns true', () => {
      expect(result).toBe(true);
    });

    it('should returns the token when calling getTokenFromStorage()', () => {
      expect(getTokenFromStorage()).toEqual(token);
    });

    describe('when calling removeTokenFromStorage()', () => {
      beforeEach(() => {
        result = removeTokenFromStorage();
      });

      it('should returns undefined when calling getTokenFromStorage()', () => {
        expect(getTokenFromStorage()).toBeUndefined();
      });

      it('should returns true', () => {
        expect(result).toBe(true);
      });
    });
  });

  describe('when calling getStateDataFromToken(token) with a invalid token', () => {
    let stateData;

    beforeEach(() => {
      stateData = getStateDataFromToken('invlidToken');
    });

    it('should return empty state data when calling getStateDataFromToken(token) with a invalid token', () => {
      expect(stateData.toJS()).toEqual(emptyStateData);
    });

    it('should stateData be instance of Immutable.Map', () => {
      expect(stateData instanceof Map).toBe(true);
    });
  });

  describe('when calling getStateDataFromToken(token) with a valid token', () => {
    let stateData;

    beforeEach(() => {
      stateData = getStateDataFromToken(token);
    });

    it('should stateData be instance of Immutable.Map', () => {
      expect(stateData instanceof Map).toBe(true);
    });

    it('should stateData.isAuthenticated be true', () => {
      expect(stateData.get('isAuthenticated')).toBe(true);
    });

    it('should stateData.hasTokenRefreshed be true', () => {
      expect(stateData.get('hasTokenRefreshed')).toBe(true);
    });

    it('should stateData.user be equal to decodedToken.user', () => {
      expect(stateData.get('user').toJS()).toEqual(decodedToken.user);
    });

    it('should stateData.tokenExpiryTime be a number', () => {
      expect(isNumber(stateData.get('tokenExpiryTime'))).toBe(true);
    });

    it('should stateData.token be the same as token', () => {
      expect(stateData.get('token')).toBe(token);
    });
  });

  describe('when calling getEmptyStateData()', () => {
    let stateData;

    beforeEach(() => {
      stateData = getEmptyStateData();
    });

    it('should stateData be instance of Immutable.Map', () => {
      expect(stateData instanceof Map).toBe(true);
    });

    it('should stateData.isAuthenticated be false', () => {
      expect(stateData.get('isAuthenticated')).toBe(false);
    });

    it('should stateData.hasTokenRefreshed be false', () => {
      expect(stateData.get('hasTokenRefreshed')).toBe(false);
    });

    it('should stateData.user be null', () => {
      expect(stateData.get('user')).toBeNull();
    });

    it('should stateData.token be the same as token', () => {
      expect(stateData.get('token')).toBeNull();
    });
  });

  describe('when calling calculateExpiryTime(timeInMs)', () => {
    let now;

    beforeEach(() => {
      now = 1492090098140;
      MockDate.set(now);
    });

    afterEach(() => {
      MockDate.reset();
    });

    it('should resultInMinutes be equal to expireTimestamp + 4.5min', () => {
      const expireTimestampInMs = now + (5 * 60 * 1000);
      const expectedTimeInMs = now + (4.5 * 60 * 1000);

      const expireTimestampInSec = expireTimestampInMs / 1000;
      const resultInMs = calculateExpiryTime(expireTimestampInSec);

      expect(resultInMs).toBeLessThan(expectedTimeInMs);
    });
  });
});

