"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = require("immutable");

var _constants = require("./constants");

var _utils = require("./utils");

/*
 *
 * AuthenticationProvider reducer
 *
 */
function authenticationReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getInitialState();
  var action = arguments.length > 1 ? arguments[1] : undefined;

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

    case _constants.SET_LAST_USER_TOKEN:
      return onSetLastUserToken(state, action);

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
  return state.mergeIn(['tokenData'], action.tokenData);
}

function onClearTokenDataAction(state) {
  return state["delete"]('tokenData');
}

function onMarkTokenAsRefreshedAction(state) {
  return state.set('isReady', true);
}

function onSetUserDataAction(state, action) {
  return state.setIn(['userData'], (0, _immutable.fromJS)(action.userData));
}

function onClearUserDataAction(state) {
  return state["delete"]('userData');
}

function onSetLastUserToken(state, action) {
  var key = action.key,
      token = action.token;
  return state.setIn(['lastTokens', key], token);
}

var _default = authenticationReducer;
exports["default"] = _default;