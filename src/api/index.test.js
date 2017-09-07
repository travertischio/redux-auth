import apiClient from 'api-client';
import MockAdapter from 'axios-mock-adapter';
import {
  signIn,
  refreshToken,
  requestPasswordReset,
  resetPassword,
  signUp,
  signOut,
  setAuthorizationTokenInHeaders,
  removeAuthorizationTokenInHeaders,
} from './';

describe('redux-auth API', () => {
  let mock;

  const successAuthResponse = {
    token: 'xyz123',
    permanentToken: 'zxv',
    deviceId: 123,
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

  describe('when calling refreshToken(permanentToken)', () => {
    it('should return promise and resolve it with successAuthResponse and send Permanent-Token in headers', (done) => {
      const permanentToken = 'XYZ';
      mock.onPost('/auth/9743a66f914cc249efca164485a19c5c', {}).reply(200, successAuthResponse);

      refreshToken(permanentToken)
        .then((response) => {
          expect(response.data).toEqual(successAuthResponse);
          expect(response.config.headers['Permanent-Token']).toEqual(permanentToken);
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

  describe('when calling signOut(1234)', () => {
    it('should return promise and resolve it with successAuthResponse and send Device-Id in headers', (done) => {
      const deviceId = 1234;
      mock.onDelete('/auth/logout').reply(204, successAuthResponse);

      signOut(deviceId)
        .then((response) => {
          expect(response.data).toEqual(successAuthResponse);
          expect(response.config.headers['Device-Id']).toEqual(deviceId);
          done();
        });
    });
  });

  describe('when calling setAuthorizationTokenInHeaders(authHeader)', () => {
    const permanentToken = 'CYZ';
    const token = 'XYZ123';

    beforeEach(() => {
      setAuthorizationTokenInHeaders(token);
    });

    it('should request headers have "Authorization" header', (done) => {
      mock.onPost('/auth/9743a66f914cc249efca164485a19c5c', {}).reply(200, successAuthResponse);

      refreshToken(permanentToken)
        .then((response) => {
          expect(response.config.headers.Authorization).toEqual(`JWT ${token}`);
          done();
        });
    });

    describe('when calling removeAuthorizationTokenInHeaders()', () => {
      beforeEach(() => {
        removeAuthorizationTokenInHeaders();
      });

      it('should request headers have not "Authorization" header', (done) => {
        mock.onPost('/auth/9743a66f914cc249efca164485a19c5c', {}).reply(200, successAuthResponse);

        refreshToken(token)
          .then((response) => {
            expect(response.config.headers.Authorization).toEqual(undefined);
            done();
          });
      });
    });
  });
});
