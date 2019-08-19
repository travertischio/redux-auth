"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SignUpForm = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactIntl = require("react-intl");

var _immutable = require("redux-form/immutable");

var _reduxForm = _interopRequireDefault(require("react-form-fields/lib/EmailField/reduxForm"));

var _reduxForm2 = _interopRequireDefault(require("react-form-fields/lib/TextField/reduxForm"));

var _reduxForm3 = _interopRequireDefault(require("react-form-fields/lib/PasswordField/reduxForm"));

var _required = require("validators/lib/required");

var _email = require("validators/lib/email");

var _setOfPasswordValidators = require("validators/lib/setOfPasswordValidators");

var _matchToPassword = require("validators/lib/matchToPassword");

var _messages = _interopRequireDefault(require("./messages"));

/**
*
* SignUpForm
*
*/
var SignUpForm = function SignUpForm(props) {
  var handleSubmit = props.handleSubmit,
      pristine = props.pristine,
      submitting = props.submitting,
      formatMessage = props.intl.formatMessage;
  var firstNameLabel = formatMessage(_messages["default"].firstName);
  var emailLabel = formatMessage(_messages["default"].email);
  var passwordLabel = formatMessage(_messages["default"].password);
  var confirmPasswordLabel = formatMessage(_messages["default"].confirmPassword);

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
    id: "firstName",
    name: "firstName",
    label: firstNameLabel,
    placeholder: firstNameLabel,
    validate: [_required.required],
    component: _reduxForm2["default"]
  }), _react["default"].createElement(_immutable.Field, {
    id: "email",
    name: "email",
    label: emailLabel,
    placeholder: emailLabel,
    validate: [_required.required, _email.email],
    component: _reduxForm["default"]
  }), _react["default"].createElement(_immutable.Field, {
    id: "password",
    name: "password",
    label: passwordLabel,
    placeholder: passwordLabel,
    validate: _setOfPasswordValidators.setOfPasswordValidators,
    component: _reduxForm3["default"]
  }), _react["default"].createElement(_immutable.Field, {
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
    label: confirmPasswordLabel,
    placeholder: confirmPasswordLabel,
    validate: [_required.required, _matchToPassword.matchToPassword],
    component: _reduxForm3["default"]
  }), _react["default"].createElement("div", null, _react["default"].createElement("button", {
    type: "submit",
    disabled: pristine || submitting
  }, "Sign Up")));
};

exports.SignUpForm = SignUpForm;

var _default = (0, _immutable.reduxForm)({
  form: 'signUpForm'
})((0, _reactIntl.injectIntl)(SignUpForm));

exports["default"] = _default;