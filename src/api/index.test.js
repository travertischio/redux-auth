import apiClient from 'api-client';
import MockAdapter from 'axios-mock-adapter';
import { tokenAndUserData } from '~/test.data';
import {
  signIn,
  extendTokenLifetime,
  requestPasswordReset,
  resetPassword,
  signUp,
  // signOut,
  setAuthorizationTokenInHeaders,
  removeAuthorizationTokenInHeaders,
} from '.';

describe('redux-auth API', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  describe('when calling signIn', () => {
    const credentials = {
      email: 'tester@test.com',
      password: 'xyz123',
    };

    beforeEach(() => {
      mock.onPost('/auth/login', credentials).reply(200, tokenAndUserData);
    });

    it('should return promise and resolve it with tokenAndUserData', (done) => {
      signIn(credentials)
        .then((response) => {
          expect(response.data).toEqual(tokenAndUserData);
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

  describe('when calling extendTokenLifetime(token)', () => {
    it('should return promise and resolve it with tokenAndUserData and send token in headers', (done) => {
      const token = 'XYZ';
      mock.onPost('/auth/token/extend-lifetime', {}).reply(200, tokenAndUserData);

      extendTokenLifetime(token)
        .then((response) => {
          expect(response.data).toEqual(tokenAndUserData);
          expect(response.config.headers.Authorization).toEqual(`Token ${token}`);
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
    it('should return promise and resolve it with tokenAndUserData', (done) => {
      const payload = {
        token: 'old-xyz123',
        new_password: 'asd123',
        re_new_password: 'asd123',
      };
      mock.onPost('/auth/reset-password-confirm', payload).reply(200, tokenAndUserData);

      resetPassword(payload)
        .then((response) => {
          expect(response.data).toEqual(tokenAndUserData);
          done();
        });
    });
  });

  describe('when calling signUp(payload)', () => {
    it('should return promise and resolve it with tokenAndUserData', (done) => {
      const payload = {
        first_name: 'Jonhn',
        email: 'tester@test.com',
        password: 'asd123',
        confirm_password: 'asd123',
      };
      mock.onPost('/user/register', payload).reply(200, tokenAndUserData);

      signUp(payload)
        .then((response) => {
          expect(response.data).toEqual(tokenAndUserData);
          done();
        });
    });
  });

  describe('when calling setAuthorizationTokenInHeaders(authHeader)', () => {
    const token = 'XYZ123';

    beforeEach(() => {
      setAuthorizationTokenInHeaders(token);
    });

    it('should request headers have "Authorization" header', (done) => {
      mock.onPost('/users/', {}).reply(200, tokenAndUserData);

      apiClient.post('/users/', {})
        .then((response) => {
          expect(response.config.headers.Authorization).toEqual(`Token ${token}`);
          done();
        });
    });

    describe('when calling removeAuthorizationTokenInHeaders()', () => {
      beforeEach(() => {
        removeAuthorizationTokenInHeaders();
      });

      it('should request headers have not "Authorization" header', (done) => {
        mock.onPost('/users/', {}).reply(200, tokenAndUserData);

        apiClient.post('/users/', {})
          .then((response) => {
            expect(response.config.headers.Authorization).toEqual(undefined);
            done();
          });
      });
    });
  });
});
