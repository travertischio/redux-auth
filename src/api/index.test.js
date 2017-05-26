import apiClient from 'api-client';
import MockAdapter from 'axios-mock-adapter';
import {
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
    permanentToken: null,
  };

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  describe('when calling signIn', () => {
    const credentials = {
      email: 'tester@test.com',
      password: 'xyz123',
    };

    beforeEach(() => {
      mock.onPost('/auth/login', credentials).reply(200, successAuthResponse);
    });

    it('should return promise and resolve it with successAuthResponse', (done) => {
      signIn(credentials)
        .then((response) => {
          expect(response.data).toEqual(successAuthResponse);
          done();
        });
    });

    it('should request version=2 of login', (done) => {
      signIn(credentials)
        .then((response) => {
          expect(response.config.headers.Accept).toEqual('application/json; version=2');
          done();
        });
    });
  });

  describe('when calling refreshToken(token)', () => {
    it('should return promise and resolve it with successAuthResponse', (done) => {
      const token = 'xyz123';
      mock.onPost('/auth/9743a66f914cc249efca164485a19c5c', { token }).reply(200, successAuthResponse);

      refreshToken(token)
        .then((response) => {
          expect(response.data).toEqual(successAuthResponse);
          done();
        });
    });
  });

  describe('when calling requestPasswordReset(payload)', () => {
    it('should return promise and resolve it with payload', (done) => {
      const payload = {
        email: 'tester@test.com',
      };
      mock.onPost('/auth/reset-password', payload).reply(200, payload);

      requestPasswordReset(payload)
        .then((response) => {
          expect(response.data).toEqual(payload);
          done();
        });
    });
  });

  describe('when calling resetPassword(payload)', () => {
    it('should return promise and resolve it with successAuthResponse', (done) => {
      const payload = {
        token: 'old-xyz123',
        new_password: 'asd123',
        re_new_password: 'asd123',
      };
      mock.onPost('/auth/reset-password-confirm', payload).reply(200, successAuthResponse);

      resetPassword(payload)
        .then((response) => {
          expect(response.data).toEqual(successAuthResponse);
          done();
        });
    });
  });

  describe('when calling signUp(payload)', () => {
    it('should return promise and resolve it with successAuthResponse', (done) => {
      const payload = {
        first_name: 'Jonhn',
        email: 'tester@test.com',
        password: 'asd123',
        confirm_password: 'asd123',
      };
      mock.onPost('/user/register', payload).reply(200, successAuthResponse);

      signUp(payload)
        .then((response) => {
          expect(response.data).toEqual(successAuthResponse);
          done();
        });
    });
  });
});
