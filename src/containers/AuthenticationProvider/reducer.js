/*
 *
 * AuthenticationProvider reducer
 *
 */

import {
  SET_TOKEN_DATA_ACTION,
  CLEAR_TOKEN_DATA_ACTION,
  MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION,
  SET_USER_DATA_ACTION,
  CLEAR_USER_DATA_ACTION,
} from './constants';
import {
  getAuthDataFromStorage,
  getInitialStateData,
} from './utils';

function authenticationReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_TOKEN_DATA_ACTION:
      return onSetTokenDataAction(state, action);
    case CLEAR_TOKEN_DATA_ACTION:
      return onClearTokenDataAction(state);
    case MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION:
      return onMarkTokenAsRefreshedAction(state);
    case SET_USER_DATA_ACTION:
      return onSetUserDataAction(state, action);
    case CLEAR_USER_DATA_ACTION:
      return onClearUserDataAction(state);
    default:
      return state;
  }
}

function getInitialState() {
  const authData = getAuthDataFromStorage();
  let stateData = getInitialStateData();

  if (authData) {
    stateData = stateData.merge(authData);
  }

  return stateData;
}

function onSetTokenDataAction(state, action) {
  return state
    .mergeIn(['tokenData'], action.tokenData)
    .set('isReady', true);
}

function onClearTokenDataAction(state) {
  return state
    .delete('tokenData');
}

function onMarkTokenAsRefreshedAction(state) {
  return state
    .set('isReady', true);
}

function onSetUserDataAction(state, action) {
  return state
    .mergeIn(['userData'], action.userData);
}

function onClearUserDataAction(state) {
  return state
    .delete('userData');
}

export default authenticationReducer;
