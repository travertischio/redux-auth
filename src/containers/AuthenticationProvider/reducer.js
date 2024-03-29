/*
 *
 * AuthenticationProvider reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_TOKEN_DATA_ACTION,
  CLEAR_TOKEN_DATA_ACTION,
  MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION,
  SET_USER_DATA_ACTION,
  CLEAR_USER_DATA_ACTION,
  SET_LAST_USER_TOKEN,
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
    case SET_LAST_USER_TOKEN:
      return onSetLastUserToken(state, action);
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
    .mergeIn(['tokenData'], action.tokenData);
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
    .setIn(
      ['userData'],
      fromJS(action.userData)
    );
}

function onClearUserDataAction(state) {
  return state
    .delete('userData');
}

function onSetLastUserToken(state, action) {
  const {
    key,
    token,
  } = action;

  return state
    .setIn(['lastTokens', key], token);
}

export default authenticationReducer;
