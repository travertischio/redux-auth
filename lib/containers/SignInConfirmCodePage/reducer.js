'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = signInConfirmCodeReducer;

var _immutable = require('immutable');

// import {
//   // SIGN_IN_ACTION,
//   // SIGN_IN_SUCCESS_ACTION,
//   // SIGN_IN_FAILED_ACTION,
//   // DESTROY_PAGE_ACTION,
// } from './constants';

var initialState = (0, _immutable.fromJS)({});

function signInConfirmCodeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    // case SIGN_IN_ACTION:
    //   return onSignInAction(state);
    // case SIGN_IN_SUCCESS_ACTION:
    //   return onSignSuccessAction(state);
    // case SIGN_IN_FAILED_ACTION:
    //   return onSignFailedAction(state, action.payload);
    // case DESTROY_PAGE_ACTION:
    //   return onDestroyPageAction(state);
    default:
      return state;
  }
}