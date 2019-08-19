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

var _reduxForm = _interopRequireDefault(require("react-form-fields/lib/PasswordField/reduxForm"));

var _required = require("validators/lib/required");

var _setOfPasswordValidators = require("validators/lib/setOfPasswordValidators");

var _matchToNewPassword = require("validators/lib/matchToNewPassword");

var _messages = _interopRequireDefault(require("./messages"));

/**
*
* ResetPasswordForm
*
*/
function ResetPasswordForm(props) {
  var handleSubmit = props.handleSubmit,
      pristine = props.pristine,
      submitting = props.submitting;
  var formatMessage = props.intl.formatMessage;
  var newPasswordLabel = formatMessage(_messages["default"].newPasswordLabel);
  var newPasswordPlaceholder = formatMessage(_messages["default"].newPasswordPlaceholder);
  var reNewPassword = formatMessage(_messages["default"].reNewPassword);
  var reNewPasswordPlaceholder = formatMessage(_messages["default"].reNewPasswordPlaceholder);

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
    id: "newPassword",
    name: "newPassword",
    label: newPasswordLabel,
    placeholder: newPasswordPlaceholder,
    validate: _setOfPasswordValidators.setOfPasswordValidators,
    component: _reduxForm["default"]
  }), _react["default"].createElement(_immutable.Field, {
    id: "reNewPassword",
    name: "reNewPassword",
    label: reNewPassword,
    placeholder: reNewPasswordPlaceholder,
    validate: [_required.required, _matchToNewPassword.matchToNewPassword],
    component: _reduxForm["default"]
  }), _react["default"].createElement("div", null, _react["default"].createElement("button", {
    type: "submit",
    disabled: pristine || submitting
  }, "Save")));
}

var _default = (0, _immutable.reduxForm)({
  form: 'resetPasswordForm'
})((0, _reactIntl.injectIntl)(ResetPasswordForm));

exports["default"] = _default;