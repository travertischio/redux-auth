"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUCCESS_AUTHENTICATION_RESPONSE_ACTION = exports.FAILED_AUTHENTICATION_RESPONSE_ACTION = exports.BLOCKED_ACCOUNT_ACTION = exports.REQUIRE_CAPTCHA_ACTION = exports.SET_LAST_USER_TOKEN = exports.SIGN_OUT_FAILED_ACTION = exports.SIGN_OUT_SUCCESS_ACTION = exports.SIGN_OUT_ACTION = exports.TWO_FACTOR_SEND_CODE_FAILED_ACTION = exports.TWO_FACTOR_SEND_CODE_SUCCESS_ACTION = exports.TWO_FACTOR_SEND_CODE_ACTION = exports.CLEAR_USER_DATA_ACTION = exports.SET_USER_DATA_ACTION = exports.MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION = exports.EXTEND_TOKEN_LIFETIME_ACTION = exports.MARK_TOKEN_AS_INVALID_ACTION = exports.CLEAR_TOKEN_DATA_ACTION = exports.SET_TOKEN_DATA_ACTION = exports.TOKEN_STATUS_AWAITING_SECOND_FACTOR = exports.TOKEN_STATUS_INVALID = exports.TOKEN_STATUS_VALID = exports.ENCRYPT_SECRET_KEY = exports.LAST_ACTIVE_KEY = exports.AUTH_KEY = void 0;

/*
 *
 * AuthenticationProvider constants
 *
 */
var AUTH_KEY = 'auth';
exports.AUTH_KEY = AUTH_KEY;
var LAST_ACTIVE_KEY = 'authLastActive';
exports.LAST_ACTIVE_KEY = LAST_ACTIVE_KEY;
var ENCRYPT_SECRET_KEY = navigator.userAgent;
exports.ENCRYPT_SECRET_KEY = ENCRYPT_SECRET_KEY;
var TOKEN_STATUS_VALID = 'valid';
exports.TOKEN_STATUS_VALID = TOKEN_STATUS_VALID;
var TOKEN_STATUS_INVALID = 'invalid';
exports.TOKEN_STATUS_INVALID = TOKEN_STATUS_INVALID;
var TOKEN_STATUS_AWAITING_SECOND_FACTOR = 'awaiting_second_factor';
exports.TOKEN_STATUS_AWAITING_SECOND_FACTOR = TOKEN_STATUS_AWAITING_SECOND_FACTOR;
var SET_TOKEN_DATA_ACTION = 'app/AuthenticationProvider/SET_TOKEN_DATA';
exports.SET_TOKEN_DATA_ACTION = SET_TOKEN_DATA_ACTION;
var CLEAR_TOKEN_DATA_ACTION = 'app/AuthenticationProvider/CLEAR_TOKEN_DATA';
exports.CLEAR_TOKEN_DATA_ACTION = CLEAR_TOKEN_DATA_ACTION;
var MARK_TOKEN_AS_INVALID_ACTION = 'app/AuthenticationProvider/MARK_TOKEN_AS_INVALID';
exports.MARK_TOKEN_AS_INVALID_ACTION = MARK_TOKEN_AS_INVALID_ACTION;
var EXTEND_TOKEN_LIFETIME_ACTION = 'app/AuthenticationProvider/EXTEND_TOKEN_LIFETIME';
exports.EXTEND_TOKEN_LIFETIME_ACTION = EXTEND_TOKEN_LIFETIME_ACTION;
var MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION = 'app/AuthenticationProvider/MARK_AUTHENTICATION_PROVIDER_AS_READY';
exports.MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION = MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION;
var SET_USER_DATA_ACTION = 'app/AuthenticationProvider/SET_USER_DATA';
exports.SET_USER_DATA_ACTION = SET_USER_DATA_ACTION;
var CLEAR_USER_DATA_ACTION = 'app/AuthenticationProvider/CLEAR_USER_DATA';
exports.CLEAR_USER_DATA_ACTION = CLEAR_USER_DATA_ACTION;
var TWO_FACTOR_SEND_CODE_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE';
exports.TWO_FACTOR_SEND_CODE_ACTION = TWO_FACTOR_SEND_CODE_ACTION;
var TWO_FACTOR_SEND_CODE_SUCCESS_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE_SUCCESS';
exports.TWO_FACTOR_SEND_CODE_SUCCESS_ACTION = TWO_FACTOR_SEND_CODE_SUCCESS_ACTION;
var TWO_FACTOR_SEND_CODE_FAILED_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE_FAILED';
exports.TWO_FACTOR_SEND_CODE_FAILED_ACTION = TWO_FACTOR_SEND_CODE_FAILED_ACTION;
var SIGN_OUT_ACTION = 'app/AuthenticationProvider/SIGN_OUT';
exports.SIGN_OUT_ACTION = SIGN_OUT_ACTION;
var SIGN_OUT_SUCCESS_ACTION = 'app/AuthenticationProvider/SIGN_OUT_SUCCESS';
exports.SIGN_OUT_SUCCESS_ACTION = SIGN_OUT_SUCCESS_ACTION;
var SIGN_OUT_FAILED_ACTION = 'app/AuthenticationProvider/SIGN_OUT_FAILED';
exports.SIGN_OUT_FAILED_ACTION = SIGN_OUT_FAILED_ACTION;
var SET_LAST_USER_TOKEN = 'app/AuthenticationProvider/SET_LAST_USER_TOKEN';
exports.SET_LAST_USER_TOKEN = SET_LAST_USER_TOKEN;
var REQUIRE_CAPTCHA_ACTION = 'app/AuthenticationProvider/REQUIRE_CAPTCHA';
exports.REQUIRE_CAPTCHA_ACTION = REQUIRE_CAPTCHA_ACTION;
var BLOCKED_ACCOUNT_ACTION = 'app/AuthenticationProvider/BLOCKED_ACCOUNT';
exports.BLOCKED_ACCOUNT_ACTION = BLOCKED_ACCOUNT_ACTION;
var FAILED_AUTHENTICATION_RESPONSE_ACTION = 'app/AuthenticationProvider/FAILED_AUTHENTICATION_RESPONSE';
exports.FAILED_AUTHENTICATION_RESPONSE_ACTION = FAILED_AUTHENTICATION_RESPONSE_ACTION;
var SUCCESS_AUTHENTICATION_RESPONSE_ACTION = 'app/AuthenticationProvider/SUCCESS_AUTHENTICATION_RESPONSE';
exports.SUCCESS_AUTHENTICATION_RESPONSE_ACTION = SUCCESS_AUTHENTICATION_RESPONSE_ACTION;