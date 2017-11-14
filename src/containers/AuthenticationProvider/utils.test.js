import { Map } from 'immutable';
import * as MockDate from 'mockdate';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import {
  setAuthDataInStorage,
  getAuthDataFromStorage,
  removeAuthDataFromStorage,
  getInitialStateData,
  calculateExpiryTime,
  ENCRYPT_SECRET_KEY,
} from './utils';
import { AUTH_KEY } from './constants';
import { tokenData } from '../../test.data';

describe('authentication utils', () => {
  describe('when calling setAuthDataInStorage({ token })', () => {
    let result;

    beforeEach(() => {
      result = setAuthDataInStorage(tokenData);
    });

    it('should set encrtyped an object with a token in a localStorage', () => {
      const localStorageItem = localStorage.getItem(AUTH_KEY);
      const decryptedLocalStorageItemBytes = AES.decrypt(localStorageItem, ENCRYPT_SECRET_KEY);
      const decryptedLocalStorageItem = decryptedLocalStorageItemBytes.toString(encUtf8);
      const decryptedLocalStorageObject = JSON.parse(decryptedLocalStorageItem);

      expect(decryptedLocalStorageObject.key).toEqual(tokenData.key);
    });

    it('should returns true', () => {
      expect(result).toBe(true);
    });

    it('should returns an object with token when calling getAuthDataFromStorage()', () => {
      expect(getAuthDataFromStorage()).toEqual(tokenData);
    });

    describe('when calling removeAuthDataFromStorage()', () => {
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
  });

  describe('when calling getInitialStateData()', () => {
    let stateData;

    beforeEach(() => {
      stateData = getInitialStateData();
    });

    it('should stateData be instance of Immutable.Map', () => {
      expect(stateData instanceof Map).toBe(true);
    });

    it('should stateData.isReady be false', () => {
      expect(stateData.get('isReady')).toBe(false);
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

    describe('when calling setAuthDataInStorage(tokenData)', () => {
      let result;

      beforeEach(() => {
        result = setAuthDataInStorage(tokenData);
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
