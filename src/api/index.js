import * as axios from 'axios';

// TODO move it to global settings
export const API_HOST = 'https://demo-api-dev.arabel.la';

export function signIn(credentials) {
  const endPoint = `${API_HOST}/api/auth/login`;
  const config = {
    headers: { Accept: 'application/json; version=2' },
  };
  return axios.post(endPoint, credentials, config);
}

export function refreshToken(token) {
  const endPoint = `${API_HOST}/api/auth/9743a66f914cc249efca164485a19c5c`;
  const payload = { token };
  return axios.post(endPoint, payload);
}

export function requestPasswordReset(payload) {
  const endPoint = `${API_HOST}/api/auth/reset-password`;
  return axios.post(endPoint, payload);
}

export function resetPassword(payload) {
  const endPoint = `${API_HOST}/api/auth/reset-password-confirm`;
  return axios.post(endPoint, payload);
}

export function signUp(payload) {
  const endPoint = `${API_HOST}/api/user/register`;
  return axios.post(endPoint, payload);
}
