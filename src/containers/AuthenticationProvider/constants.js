/*
 *
 * AuthenticationProvider constants
 *
 */

export const AUTH_KEY = 'auth';

export const TOKEN_STATUS_VALID = 'valid';
export const TOKEN_STATUS_AWAITING_SECOND_FACTOR = 'awaiting_second_factor';

export const SET_TOKEN_DATA_ACTION = 'app/AuthenticationProvider/SET_TOKEN_DATA';
export const CLEAR_TOKEN_DATA_ACTION = 'app/AuthenticationProvider/CLEAR_TOKEN_DATA';
export const EXTEND_TOKEN_LIFETIME_ACTION = 'app/AuthenticationProvider/EXTEND_TOKEN_LIFETIME_ACTION';
export const MARK_AUTHENTICATION_PROVIDER_AS_READY_ACTION = 'app/AuthenticationProvider/MARK_TOKEN_AS_REFRESHED';
export const SET_USER_DATA_ACTION = 'app/AuthenticationProvider/SET_USER_DATA';
export const CLEAR_USER_DATA_ACTION = 'app/AuthenticationProvider/CLEAR_USER_DATA';
export const TWO_FACTOR_SEND_CODE_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE';
export const TWO_FACTOR_SEND_CODE_SUCCESS_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE_SUCCESS';
export const TWO_FACTOR_SEND_CODE_FAILED_ACTION = 'app/AuthenticationProvider/TWO_FACTOR_SEND_CODE_FAILED';
