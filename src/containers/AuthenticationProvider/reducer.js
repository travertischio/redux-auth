/*
 *
 * AuthenticationProvider reducer
 *
 */

import {
  SET_TOKEN_ACTION,
  SET_PERMANENT_TOKEN_AND_DEVICE_ID_ACTION,
  CLEAR_TOKEN_ACTION,
  MARK_TOKEN_AS_REFRESHED_ACTION,
} from './constants';
import {
  getAuthDataFromStorage,
  getStateDataFromToken,
  getEmptyStateData,
} from './utils';

function authenticationReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_TOKEN_ACTION:
      return onSetTokenAction(state, action.payload);
    case SET_PERMANENT_TOKEN_AND_DEVICE_ID_ACTION:
      return onSetPermanentTokenAndDeviceIdAction(state, action.payload);
    case CLEAR_TOKEN_ACTION:
      return onClearTokenAction(state);
    case MARK_TOKEN_AS_REFRESHED_ACTION:
      return onMarkTokenAsRefreshedAction(state);
    default:
      return state;
  }
}

function getInitialState() {
  const authData = getAuthDataFromStorage();
  let stateData = getEmptyStateData();

  if (authData) {
    stateData = stateData.merge(authData);
  }

  return stateData;
}

function onSetTokenAction(state, token) {
  const stateData = getStateDataFromToken(token);

  return state
    .merge(stateData);
}

function onSetPermanentTokenAndDeviceIdAction(state, payload) {
  return state
    .merge({
      permanentToken: payload.permanentToken,
      deviceId: payload.deviceId,
    });
}

function onClearTokenAction(state) {
  const stateData = getEmptyStateData();

  return state
    .merge(stateData)
    .delete('tokenExpiryTime')
    .set('hasTokenRefreshed', true);
}

function onMarkTokenAsRefreshedAction(state) {
  return state
    .set('hasTokenRefreshed', true);
}

export default authenticationReducer;
