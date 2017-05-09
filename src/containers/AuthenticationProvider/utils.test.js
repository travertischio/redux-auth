import { Map } from 'immutable';
import * as MockDate from 'mockdate';
import isNumber from 'lodash/isNumber';
import { setTokenInStorage, getTokenFromStorage, removeTokenFromStorage, getStateDataFromToken, getEmptyStateData, calculateExpiryTime } from './utils';
import { TOKEN_KEY } from './constants';

describe('authentication utils', () => {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NiwiZW1haWwiOiJ0ZXN0ZXJAdGVzdC5jb20iLCJ1c2VybmFtZSI6InRlc3RlckB0ZXN0LmNvbSIsImV4cCI6MTQ5NDMzMDE4NSwib3JpZ19pYXQiOjE0OTQzMjk4ODUsInVzZXIiOnsiZmlyc3RfbmFtZSI6IkpvaG4iLCJpZCI6NDYsImxhc3RfbmFtZSI6IlNtaXRoIiwiZW1haWwiOiJ0ZXN0ZXJAdGVzdC5jb20iLCJyb2xlIjoiMTBfZXhhbXBsZV91c2VyIiwiYXZhdGFyIjpudWxsfX0.H9D75K9NhbQutLFzqAbvrZYe9b0jmTUwaaazq0BzUrM';
  const decodedToken = {
    user_id: 46,
    email: 'tester@test.com',
    username: 'tester@test.com',
    exp: 1494330185,
    orig_iat: 1494329885,
    user: {
      first_name: 'John',
      id: 46,
      last_name: 'Smith',
      email: 'tester@test.com',
      role: '10_example_user',
      avatar: null,
    },
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

  describe('when localStorage is disabled', () => {
    beforeEach(() => {
      window.localStorage = {
        getItem() {
          throw Error('localStorage is disabled');
        },
        setItem() {
          throw Error('localStorage is disabled');
        },
        removeItem() {
          throw Error('localStorage is disabled');
        },
        clear() {
          throw Error('localStorage is disabled');
        },
      };
    });

    describe('when calling setTokenInStorage(token)', () => {
      let result;

      beforeEach(() => {
        result = setTokenInStorage(token);
      });

      it('should return false', () => {
        expect(result).toBeFalsy();
      });

      it('should return undefiend when calling getTokenFromStorage', () => {
        expect(getTokenFromStorage()).toBeUndefined();
      });

      it('should return false when calling removeTokenFromStorage()', () => {
        expect(removeTokenFromStorage()).toBeFalsy();
      });
    });
  });
});
