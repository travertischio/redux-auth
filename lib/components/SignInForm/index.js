"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactIntl = require("react-intl");

var _immutable = require("redux-form/immutable");

var _reduxForm = _interopRequireDefault(require("react-form-fields/lib/EmailField/reduxForm"));

var _reduxForm2 = _interopRequireDefault(require("react-form-fields/lib/PasswordField/reduxForm"));

var _required = require("validators/lib/required");

var _email = require("validators/lib/email");

var _field = _interopRequireDefault(require("../Captcha/field"));

var _messages = _interopRequireDefault(require("./messages"));

/**
*
* SignInForm
*
*/
var SignInForm = function SignInForm(props) {
  var captchaRequired = props.captchaRequired,
      handleSubmit = props.handleSubmit,
      pristine = props.pristine,
      submitting = props.submitting;
  var formatMessage = props.intl.formatMessage;
  var emailLabel = formatMessage(_messages["default"].email);
  var passwordLabel = formatMessage(_messages["default"].password);

  var onSubmit = function onSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    handleSubmit();
  };

  return _react["default"].createElement("form", {
    onSubmit: onSubmit,
    noValidate: true
  }, _react["default"].createElement(_immutable.Field, {
    name: "email",
    id: "email",
    label: emailLabel,
    placeholder: emailLabel,
    validate: [_required.required, _email.email],
    component: _reduxForm["default"]
  }), _react["default"].createElement(_immutable.Field, {
    name: "password",
    id: "password",
    label: passwordLabel,
    placeholder: passwordLabel,
    validate: [_required.required],
    component: _reduxForm2["default"]
  }), captchaRequired && _react["default"].createElement(_immutable.Field, {
    name: "captcha",
    validate: [_required.required],
    component: _field["default"]
  }), _react["default"].createElement("div", null, _react["default"].createElement("button", {
    type: "submit",
    disabled: pristine || submitting
  }, "Sign In")));
};

SignInForm.defaultProps = {
  captchaRequired: false
};

var _default = (0, _immutable.reduxForm)({
  form: 'signInForm'
})((0, _reactIntl.injectIntl)(SignInForm));

exports["default"] = _default;