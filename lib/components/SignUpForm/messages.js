"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactIntl = require("react-intl");

/*
 * SignUp Messages
 *
 * This contains all the text for the SignUp component.
 */
var _default = (0, _reactIntl.defineMessages)({
  firstName: {
    id: 'app.components.SignIn.form.firstName',
    defaultMessage: 'Name'
  },
  email: {
    id: 'app.components.SignIn.form.email',
    defaultMessage: 'E-mail'
  },
  password: {
    id: 'app.components.SignIn.form.password',
    defaultMessage: 'Password'
  },
  confirmPassword: {
    id: 'app.components.SignIn.form.confirmPassword',
    defaultMessage: 'Repeat password'
  }
});

exports["default"] = _default;