import apiClient, { setHeaders } from 'api-client';

export function signIn(credentials) {
  const config = {
    headers: { Accept: 'application/json; version=2' },
  };
  return apiClient.post('/auth/login', credentials, config);
}

export function refreshToken(token) {
  const payload = { token };
  return apiClient.post('/auth/9743a66f914cc249efca164485a19c5c', payload);
}

export function requestPasswordReset(payload) {
  return apiClient.post('/auth/reset-password', payload);
}

export function resetPassword(payload) {
  return apiClient.post('/auth/reset-password-confirm', payload);
}

export function signUp(payload) {
  return apiClient.post('/user/register', payload);
}

export function signOut() {
  return apiClient.post('/auth/logout');
}

export function setAuthorizationTokenInHeaders(token) {
  setHeaders({
    Authorization: `JWT ${token}`,
  });
}

export function removeAuthorizationTokenInHeaders() {
  delete apiClient.defaults.headers.Authorization;
}
