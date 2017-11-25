import apiClient, { setHeaders } from 'api-client';

export function signIn(credentials) {
  const config = {
    headers: { Accept: 'application/json; version=2' },
  };
  return apiClient.post('/auth/login', credentials, config);
}

export function extendTokenLifetime(token) {
  const config = {
    headers: { Authorization: `Token ${token}` },
  };
  return apiClient.post('/auth/token/extend-lifetime', {}, config);
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

export function twoFactorSendCode(token) {
  return apiClient.post('/auth/login/two-factor/send-code', { token });
}

export function twoFactorConfirmCode(token, code) {
  const payload = {
    token,
    code,
  };

  return apiClient.post('/auth/login/two-factor/confirm-code', payload);
}

export function setAuthorizationTokenInHeaders(token) {
  setHeaders({
    Authorization: `Token ${token}`,
  });
}

export function removeAuthorizationTokenInHeaders() {
  delete apiClient.defaults.headers.Authorization;
}
