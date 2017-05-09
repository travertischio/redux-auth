import _get from 'lodash/get';
import { createSelector } from 'reselect';

const selectAuthenticationDomain = (state) => state.get('auth');

const selectToken = createSelector(
  selectAuthenticationDomain,
  (authState) => authState.get('token')
);

const selectTokenExpiryTime = createSelector(
  selectAuthenticationDomain,
  (authState) => authState.get('tokenExpiryTime')
);

const selectIsAuthenticated = createSelector(
  selectAuthenticationDomain,
  (authState) => authState.get('isAuthenticated')
);

const selectUser = createSelector(
  selectAuthenticationDomain,
  (authState) => {
    const user = authState.get('user');
    return user ? user.toJS() : null;
  }
);

const selectHasTokenRefreshed = createSelector(
  selectAuthenticationDomain,
  (authState) => authState.get('hasTokenRefreshed')
);

const selectTokenFromActionPayload = (action) => _get(action, ['payload', 'data', 'token']);

export {
  selectAuthenticationDomain,
  selectToken,
  selectTokenExpiryTime,
  selectIsAuthenticated,
  selectUser,
  selectHasTokenRefreshed,
  selectTokenFromActionPayload,
};
