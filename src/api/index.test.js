import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  API_HOST,
  signIn,
  refreshToken,
  requestPasswordReset,
  resetPassword,
  signUp,
} from './';

describe('redux-auth API', () => {
  let mock;

  const successAuthResponse = {
    token: 'xyz123',
    permanent_token: null,
  };

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  describe('when calling signIn', () => {
    const credentials = {
      email: 'tester@test.com',
      password: 'xyz123',
    };

    beforeEach(() => {
      mock.onPost(`${API_HOST}/api/auth/login`, credentials).reply(200, successAuthResponse);
    });

    it('should return promise and resolve it with successAuthResponse', () => {
      signIn(credentials)
        .then((response) => {
          expect(response.data).toEqual(successAuthResponse);
        });
    });

    it('should request version=2 of login', () => {
      signIn(credentials)
        .then((response) => {
          expect(response.config.headers.Accept).toEqual('application/json; version=2');
        });
    });
  });

  describe('when calling refreshToken(token)', () => {
    it('should return promise and resolve it with successAuthResponse', () => {
      const token = 'xyz123';
      mock.onPost(`${API_HOST}/api/auth/9743a66f914cc249efca164485a19c5c`, { token }).reply(200, successAuthResponse);

      refreshToken(token)
        .then((response) => {
          expect(response.data).toEqual(successAuthResponse);
        });
    });
  });

  describe('when calling requestPasswordReset(payload)', () => {
    it('should return promise and resolve it with payload', () => {
      const payload = {
        email: 'tester@test.com',
      };
      mock.onPost(`${API_HOST}/api/auth/reset-password`, payload).reply(200, payload);

      requestPasswordReset(payload)
        .then((response) => {
          expect(response.data).toEqual(payload);
        });
    });
  });

  describe('when calling resetPassword(payload)', () => {
    it('should return promise and resolve it with successAuthResponse', () => {
      const payload = {
        token: 'old-xyz123',
        new_password: 'asd123',
        re_new_password: 'asd123',
      };
      mock.onPost(`${API_HOST}/api/auth/reset-password-confirm`, payload).reply(200, successAuthResponse);

      resetPassword(payload)
        .then((response) => {
          expect(response.data).toEqual(successAuthResponse);
        });
    });
  });

  describe('when calling signUp(payload)', () => {
    it('should return promise and resolve it with successAuthResponse', () => {
      const payload = {
        first_name: 'Jonhn',
        email: 'tester@test.com',
        password: 'asd123',
        confirm_password: 'asd123',
      };
      mock.onPost(`${API_HOST}/api/auth/reset-password-confirm`, payload).reply(200, successAuthResponse);

      signUp(payload)
        .then((response) => {
          expect(response.data).toEqual(successAuthResponse);
        });
    });
  });
});
