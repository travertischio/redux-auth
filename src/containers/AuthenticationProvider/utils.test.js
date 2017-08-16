import { Map } from 'immutable';
import humps from 'humps';
import * as MockDate from 'mockdate';
import isNumber from 'lodash/isNumber';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import {
  setAuthDataInStorage,
  getAuthDataFromStorage,
  removeAuthDataFromStorage,
  getStateDataFromToken,
  getEmptyStateData,
  calculateExpiryTime,
} from './utils';
import { AUTH_KEY } from './constants';
import config, { setConfig } from '../../config';

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
    permanentToken: null,
    deviceId: null,
  };

  describe('when calling setAuthDataInStorage({ token })', () => {
    let result;

    beforeEach(() => {
      result = setAuthDataInStorage({ token });
    });

    it('should set encrtyped an object with a token in a localStorage', () => {
      const localStorageItem = localStorage.getItem(AUTH_KEY);
      const decryptedLocalStorageItemBytes = AES.decrypt(localStorageItem, config.encryptSecretKey);
      const decryptedLocalStorageItem = decryptedLocalStorageItemBytes.toString(encUtf8);
      const decryptedLocalStorageObject = JSON.parse(decryptedLocalStorageItem);

      expect(decryptedLocalStorageObject.token).toEqual(token);
    });

    it('should returns true', () => {
      expect(result).toBe(true);
    });

    it('should returns an object with token when calling getAuthDataFromStorage()', () => {
      expect(getAuthDataFromStorage()).toEqual({ token });
    });

    describe('when calling removeTokenFromStorage()', () => {
      beforeEach(() => {
        result = removeAuthDataFromStorage();
      });

      it('should returns undefined when calling getAuthDataFromStorage()', () => {
        expect(getAuthDataFromStorage()).toBeUndefined();
      });

      it('should returns true', () => {
        expect(result).toBe(true);
      });
    });

    describe('when change encrypt secret key', () => {
      const newEncryptSecretKey = 'NNV![vhXjSs7VUHPj?{@uPs0]/atO`';

      beforeEach(() => {
        setConfig({ encryptSecretKey: newEncryptSecretKey });
      });

      it('should not get auth data from localStorage', () => {
        expect(getAuthDataFromStorage()).toBeUndefined();
      });

      describe('when calling setAuthDataInStorage({ token }) one more time (using new encryptSecretKey)', () => {
        beforeEach(() => {
          result = setAuthDataInStorage({ token });
        });

        it('should returns an object with token when calling getAuthDataFromStorage()', () => {
          expect(getAuthDataFromStorage()).toEqual({ token });
        });
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

  describe('when calling getStateDataFromToken(token) with a valid token and camelizeUserDataKeys is config is set to true', () => {
    let stateData;

    beforeEach(() => {
      setConfig({ camelizeUserDataKeys: true });
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

    it('should stateData.user has camelized keys', () => {
      expect(stateData.get('user').toJS()).toEqual(humps.camelizeKeys(decodedToken.user));
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

    describe('when calling setAuthDataInStorage(token)', () => {
      let result;

      beforeEach(() => {
        result = setAuthDataInStorage(token);
      });

      it('should return false', () => {
        expect(result).toBeFalsy();
      });

      it('should return undefiend when calling getAuthDataFromStorage', () => {
        expect(getAuthDataFromStorage()).toBeUndefined();
      });

      it('should return false when calling removeAuthDataFromStorage()', () => {
        expect(removeAuthDataFromStorage()).toBeFalsy();
      });
    });
  });
});
