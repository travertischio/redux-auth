import _get from 'lodash/get';
import { createSelector } from 'reselect';

/**
 * Direct selector to the authentication state domain
 */
const selectAuthenticationDomain = (state) => state.get('auth');

const makeSelectToken = () => createSelector(
  selectAuthenticationDomain,
  (authState) => authState.get('token')
);

const makeSelecTokenExpiryTime = () => createSelector(
  selectAuthenticationDomain,
  (authState) => authState.get('tokenExpiryTime')
);

const makeSelectIsAuthenticated = () => createSelector(
  selectAuthenticationDomain,
  (authState) => authState.get('isAuthenticated')
);

const makeSelectUser = () => createSelector(
  selectAuthenticationDomain,
  (authState) => {
    const user = authState.get('user');
    return user ? user.toJS() : null;
  }
);

const makeSelectHasTokenRefreshed = () => createSelector(
  selectAuthenticationDomain,
  (authState) => authState.get('hasTokenRefreshed')
);

const makeSelectAuthentication = () => createSelector(
  selectAuthenticationDomain,
  (substate) => substate.toJS()
);

const selectTokenFromActionPayload = (action) => _get(action, ['payload', 'data', 'token']);

export default makeSelectAuthentication;
export {
  selectAuthenticationDomain,
  makeSelectToken,
  makeSelecTokenExpiryTime,
  makeSelectIsAuthenticated,
  makeSelectUser,
  makeSelectHasTokenRefreshed,
  selectTokenFromActionPayload,
};
