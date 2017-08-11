'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 *
 * AuthenticationProvider constants
 *
 */

var AUTH_KEY = exports.AUTH_KEY = 'auth';

var SET_TOKEN_ACTION = exports.SET_TOKEN_ACTION = 'app/AuthenticationProvider/SET_TOKEN';
var SET_PERMANENT_TOKEN_AND_DEVICE_ID_ACTION = exports.SET_PERMANENT_TOKEN_AND_DEVICE_ID_ACTION = 'app/AuthenticationProvider/SET_PERMANENT_TOKEN_AND_DEVICE_ID';
var CLEAR_TOKEN_ACTION = exports.CLEAR_TOKEN_ACTION = 'app/AuthenticationProvider/CLEAR_TOKEN';
var REFRESH_TOKEN_ACTION = exports.REFRESH_TOKEN_ACTION = 'app/AuthenticationProvider/REFRESH_TOKEN_ACTION';
var MARK_TOKEN_AS_REFRESHED_ACTION = exports.MARK_TOKEN_AS_REFRESHED_ACTION = 'app/AuthenticationProvider/MARK_TOKEN_AS_REFRESHED';