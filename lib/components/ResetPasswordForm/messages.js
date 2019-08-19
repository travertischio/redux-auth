"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactIntl = require("react-intl");

/*
 * ResetPasswordForm Messages
 *
 * This contains all the text for the ResetPasswordForm component.
 */
var _default = (0, _reactIntl.defineMessages)({
  newPasswordLabel: {
    id: 'app.components.SignInForm.newPasswordLabel',
    defaultMessage: 'New password'
  },
  newPasswordPlaceholder: {
    id: 'app.components.SignInForm.newPasswordPlaceholder',
    defaultMessage: 'Enter new password'
  },
  reNewPassword: {
    id: 'app.components.SignInForm.reNewPassword',
    defaultMessage: 'Retype new password'
  },
  reNewPasswordPlaceholder: {
    id: 'app.components.SignInForm.Placeholder',
    defaultMessage: 'Retype new password'
  }
});

exports["default"] = _default;