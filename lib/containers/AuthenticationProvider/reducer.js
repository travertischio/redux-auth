'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var _utils = require('./utils');

/*
 *
 * AuthenticationProvider reducer
 *
 */

function authenticationReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getInitialState();
  var action = arguments[1];

  switch (action.type) {
    case _constants.SET_TOKEN_DATA_ACTION:
      return onSetTokenDataAction(state, action);
    case _constants.CLEAR_TOKEN_DATA_ACTION:
      return onClearTokenDataAction(state);
    case _constants.MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION:
      return onMarkTokenAsRefreshedAction(state);
    case _constants.SET_USER_DATA_ACTION:
      return onSetUserDataAction(state, action);
    case _constants.CLEAR_USER_DATA_ACTION:
      return onClearUserDataAction(state);
    default:
      return state;
  }
}

function getInitialState() {
  var authData = (0, _utils.getAuthDataFromStorage)();
  var stateData = (0, _utils.getInitialStateData)();

  if (authData) {
    stateData = stateData.merge(authData);
  }

  return stateData;
}

function onSetTokenDataAction(state, action) {
  return state.mergeIn(['tokenData'], action.tokenData).set('isReady', true);
}

function onClearTokenDataAction(state) {
  return state.delete('tokenData');
}

function onMarkTokenAsRefreshedAction(state) {
  return state.set('isReady', true);
}

function onSetUserDataAction(state, action) {
  return state.mergeIn(['userData'], action.userData);
}

function onClearUserDataAction(state) {
  return state.delete('userData');
}

exports.default = authenticationReducer;