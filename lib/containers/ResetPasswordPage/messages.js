"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactIntl = require("react-intl");

/*
 * ResetPasswordPage Messages
 *
 * This contains all the text for the ResetPasswordPage component.
 */
var _default = (0, _reactIntl.defineMessages)({
  pageTitle: {
    id: 'app.containers.ResetPasswordPage.pageTitle',
    defaultMessage: 'Reset your password'
  },
  pageDescription: {
    id: 'app.containers.ResetPasswordPage.pageDescription',
    defaultMessage: 'Reset your password'
  },
  header: {
    id: 'app.containers.ResetPasswordPage.header',
    defaultMessage: 'Choose a new password'
  },
  successHeader: {
    id: 'app.containers.ResetPasswordPage.successHeader',
    defaultMessage: 'Your password has been changed successfully.'
  },
  goToSignInBtnLabel: {
    id: 'app.containers.ResetPasswordPage.goToSignInBtnLabel',
    defaultMessage: 'Go to sign in page.'
  },
  goToHomeBtnLabel: {
    id: 'app.containers.ResetPasswordPage.goToHomeBtnLabel',
    defaultMessage: 'Go to homepage'
  },
  requestNewPasswordBtnLabel: {
    id: 'app.containers.ResetPasswordPage.requestNewPasswordBtnLabel',
    defaultMessage: 'Request new password'
  },
  serverErrorInvalid: {
    id: 'app.containers.ResetPasswordPage.passwordRulesTip',
    defaultMessage: 'Oops, that token has expired. Please click the button below to request new password.'
  },
  serverErrorWrongPassword8CharsAndNumber: {
    id: 'app.containers.ResetPasswordPage.serverErrorWrongPassword8CharsAndNumber',
    defaultMessage: 'Passwords must contain at least 8 characters long and contain a number.'
  }
});

exports["default"] = _default;