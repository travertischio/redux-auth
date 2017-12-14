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
var LAST_ACTIVE_KEY = exports.LAST_ACTIVE_KEY = 'authLastActive';
var ENCRYPT_SECRET_KEY = exports.ENCRYPT_SECRET_KEY = navigator.userAgent;

var TOKEN_STATUS_VALID = exports.TOKEN_STATUS_VALID = 'valid';
var TOKEN_STATUS_INVALID = exports.TOKEN_STATUS_INVALID = 'invalid';
var TOKEN_STATUS_AWAITING_SECOND_FACTOR = exports.TOKEN_STATUS_AWAITING_SECOND_FACTOR = 'awaiting_second_factor';

var SET_TOKEN_DATA_ACTION = exports.SET_TOKEN_DATA_ACTION = 'app/AuthenticationProvider/SET_TOKEN_DATA';
var CLEAR_TOKEN_DATA_ACTION = exports.CLEAR_TOKEN_DATA_ACTION = 'app/AuthenticationProvider/CLEAR_TOKEN_DATA';
var MARK_TOKEN_AS_INVALID_ACTION = exports.MARK_TOKEN_AS_INVALID_ACTION = 'app/AuthenticationProvider/MARK_TOKEN_AS_INVALID';
var EXTEND_TOKEN_LIFETIME_ACTION = exports.EXTEND_TOKEN_LIFETIME_ACTION = 'app/AuthenticationProvider/EXTEND_TOKEN_LIFETIME';
var MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION = exports.MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION = 'app/AuthenticationProvider/MARK_TOKEN_AS_REFRESHED';
var SET_USER_DATA_ACTION = exports.SET_USER_DATA_ACTION = 'app/AuthenticationProvider/SET_USER_DATA';
var CLEAR_USER_DATA_ACTION = exports.CLEAR_USER_DATA_ACTION = 'app/AuthenticationProvider/CLEAR_USER_DATA';
var TWO_FACTOR_SEND_CODE_ACTION = exports.TWO_FACTOR_SEND_CODE_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE';
var TWO_FACTOR_SEND_CODE_SUCCESS_ACTION = exports.TWO_FACTOR_SEND_CODE_SUCCESS_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE_SUCCESS';
var TWO_FACTOR_SEND_CODE_FAILED_ACTION = exports.TWO_FACTOR_SEND_CODE_FAILED_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE_FAILED';
var SIGN_OUT_ACTION = exports.SIGN_OUT_ACTION = 'app/AuthenticationProvider/SIGN_OUT';
var SIGN_OUT_SUCCESS_ACTION = exports.SIGN_OUT_SUCCESS_ACTION = 'app/AuthenticationProvider/SIGN_OUT_SUCCESS';
var SIGN_OUT_FAILED_ACTION = exports.SIGN_OUT_FAILED_ACTION = 'app/AuthenticationProvider/SIGN_OUT_FAILED';
var SET_LAST_USER_TOKEN = exports.SET_LAST_USER_TOKEN = 'app/AuthenticationProvider/SET_LAST_USER_TOKEN';