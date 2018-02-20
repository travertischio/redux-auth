import moment from 'moment';
import { createSelector } from 'reselect';
import config from '~/config';
import {
  calculateExtendTokenWithinMs,
  generateLastUserTokenKey,
} from './utils';
import {
  TOKEN_STATUS_VALID,
  TOKEN_STATUS_INVALID,
} from './constants';

const selectAuthenticationDomain = (state) => state.get('auth');

const selectTokenData = createSelector(
  selectAuthenticationDomain,
  (authState) => authState.get('tokenData')
);

const selectToken = createSelector(
  selectTokenData,
  (tokenData) => tokenData && tokenData.get('key')
);

const selectTokenDataAsInvalid = createSelector(
  selectTokenData,
  (tokenData) => tokenData && tokenData
    .set('status', TOKEN_STATUS_INVALID)
    .toJS()
);

const selectTokenExpiryTime = createSelector(
  selectTokenData,
  (tokenData) => tokenData && tokenData.get('expireAt')
);

const selectExtendTokenWithinMs = createSelector(
  selectTokenExpiryTime,
  (expireAt) => calculateExtendTokenWithinMs(expireAt, config.autoSignOutWithin)
);

const selectTokenIsExpired = createSelector(
  selectTokenExpiryTime,
  (expireAt) => moment().diff(expireAt) >= 0
);

const selectLastTokens = createSelector(
  selectAuthenticationDomain,
  (tokenData) => tokenData && tokenData.get('lastTokens')
);

const makeSelectLastUserToken = (email) => createSelector(
  selectLastTokens,
  (lastTokens) => lastTokens && lastTokens.get(generateLastUserTokenKey(email))
);

const selectUser = createSelector(
  selectAuthenticationDomain,
  (authState) => {
    const userData = authState.get('userData');

    return userData ? userData.toJS() : null;
  }
);

const selectTokeIsValid = createSelector(
  selectAuthenticationDomain,
  (authState) => authState.getIn(['tokenData', 'status']) === TOKEN_STATUS_VALID
);

const selectTokeDataExists = createSelector(
  selectAuthenticationDomain,
  (authState) => authState.has('tokenData')
);

const selectUserDataExists = createSelector(
  selectAuthenticationDomain,
  (authState) => authState.has('userData')
);

const selectIsAuthenticated = createSelector(
  selectTokeIsValid,
  selectUserDataExists,
  (tokeIsValid, userDataExists) => tokeIsValid && userDataExists
);

const selectIsReady = createSelector(
  selectAuthenticationDomain,
  (authState) => authState.get('isReady')
);

export {
  makeSelectLastUserToken,
  selectAuthenticationDomain,
  selectIsAuthenticated,
  selectIsReady,
  selectLastTokens,
  selectTokeDataExists,
  selectTokeIsValid,
  selectToken,
  selectTokenData,
  selectTokenDataAsInvalid,
  selectExtendTokenWithinMs,
  selectTokenExpiryTime,
  selectTokenIsExpired,
  selectUser,
  selectUserDataExists,
};
