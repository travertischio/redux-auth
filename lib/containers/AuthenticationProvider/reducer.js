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
    case _constants.SET_TOKEN_ACTION:
      return onSetTokenAction(state, action.payload);
    case _constants.CLEAR_TOKEN_ACTION:
      return onClearTokenAction(state);
    case _constants.MARK_TOKEN_AS_REFRESHED_ACTION:
      return onMarkTokenAsRefreshedAction(state);
    default:
      return state;
  }
}

function getInitialState() {
  var token = (0, _utils.getTokenFromStorage)();
  var stateData = (0, _utils.getEmptyStateData)();

  if (token) {
    stateData = stateData.set('token', token);
  }

  return stateData;
}

function onSetTokenAction(state, token) {
  var stateData = (0, _utils.getStateDataFromToken)(token);
  return state.merge(stateData);
}

function onClearTokenAction(state) {
  var stateData = (0, _utils.getEmptyStateData)();
  return state.merge(stateData).delete('tokenExpiryTime').set('hasTokenRefreshed', true);
}

function onMarkTokenAsRefreshedAction(state) {
  return state.set('hasTokenRefreshed', true);
}

exports.default = authenticationReducer;