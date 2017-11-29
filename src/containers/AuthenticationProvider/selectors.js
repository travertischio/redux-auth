import _get from 'lodash/get';
import moment from 'moment';
import { createSelector } from 'reselect';
import { calculateExpiryTime } from './utils';
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

const selectTokenExpireInMs = createSelector(
  selectTokenExpiryTime,
  (expireAt) => calculateExpiryTime(expireAt)
);

const selectTokenIsExpired = createSelector(
  selectTokenExpiryTime,
  (expireAt) => moment().diff(expireAt) >= 0
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

const selectTokenDataFromActionPayload = (action) => _get(action, ['payload', 'data', 'tokenData']);

const selectUserDataFromActionPayload = (action) => _get(action, ['payload', 'data', 'userData']);

export {
  selectAuthenticationDomain,
  selectIsAuthenticated,
  selectIsReady,
  selectToken,
  selectTokenData,
  selectTokenDataAsInvalid,
  selectTokeIsValid,
  selectTokenDataFromActionPayload,
  selectTokenExpireInMs,
  selectTokenExpiryTime,
  selectTokenIsExpired,
  selectUser,
  selectUserDataExists,
  selectUserDataFromActionPayload,
};
