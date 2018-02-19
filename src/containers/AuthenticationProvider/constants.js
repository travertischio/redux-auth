/*
 *
 * AuthenticationProvider constants
 *
 */

export const AUTH_KEY = 'auth';
export const LAST_ACTIVE_KEY = 'authLastActive';
export const ENCRYPT_SECRET_KEY = navigator.userAgent;

export const TOKEN_STATUS_VALID = 'valid';
export const TOKEN_STATUS_INVALID = 'invalid';
export const TOKEN_STATUS_AWAITING_SECOND_FACTOR = 'awaiting_second_factor';

export const SET_TOKEN_DATA_ACTION = 'app/AuthenticationProvider/SET_TOKEN_DATA';
export const CLEAR_TOKEN_DATA_ACTION = 'app/AuthenticationProvider/CLEAR_TOKEN_DATA';
export const MARK_TOKEN_AS_INVALID_ACTION = 'app/AuthenticationProvider/MARK_TOKEN_AS_INVALID';
export const EXTEND_TOKEN_LIFETIME_ACTION = 'app/AuthenticationProvider/EXTEND_TOKEN_LIFETIME';
export const MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION = 'app/AuthenticationProvider/MARK_TOKEN_AS_REFRESHED';
export const SET_USER_DATA_ACTION = 'app/AuthenticationProvider/SET_USER_DATA';
export const CLEAR_USER_DATA_ACTION = 'app/AuthenticationProvider/CLEAR_USER_DATA';
export const TWO_FACTOR_SEND_CODE_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE';
export const TWO_FACTOR_SEND_CODE_SUCCESS_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE_SUCCESS';
export const TWO_FACTOR_SEND_CODE_FAILED_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE_FAILED';
export const SIGN_OUT_ACTION = 'app/AuthenticationProvider/SIGN_OUT';
export const SIGN_OUT_SUCCESS_ACTION = 'app/AuthenticationProvider/SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILED_ACTION = 'app/AuthenticationProvider/SIGN_OUT_FAILED';
export const SET_LAST_USER_TOKEN = 'app/AuthenticationProvider/SET_LAST_USER_TOKEN';
export const REQUIRE_CAPTCHA_ACTION = 'app/AuthenticationProvider/REQUIRE_CAPTCHA';
export const BLOCKED_ACCOUNT_ACTION = 'app/AuthenticationProvider/BLOCKED_ACCOUNT';
export const FAILED_AUTHENTICATION_RESPONSE_ACTION = 'app/AuthenticationProvider/FAILED_AUTHENTICATION_RESPONSE';
export const SUCCESS_AUTHENTICATION_RESPONSE_ACTION = 'app/AuthenticationProvider/SUCCESS_AUTHENTICATION_RESPONSE';
