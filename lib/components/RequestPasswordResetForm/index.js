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

var _required = require("validators/lib/required");

var _email = require("validators/lib/email");

var _messages = _interopRequireDefault(require("./messages"));

/**
*
* RequestPasswordResetForm
*
*/
function RequestPasswordResetForm(props) {
  var handleSubmit = props.handleSubmit,
      pristine = props.pristine,
      submitting = props.submitting;
  var formatMessage = props.intl.formatMessage;
  var emailLabel = formatMessage(_messages["default"].email);

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
    id: "email",
    name: "email",
    label: emailLabel,
    placeholder: emailLabel,
    validate: [_required.required, _email.email],
    component: _reduxForm["default"]
  }), _react["default"].createElement("div", null, _react["default"].createElement("button", {
    type: "submit",
    disabled: pristine || submitting
  }, "Submit")));
}

var _default = (0, _immutable.reduxForm)({
  form: 'requestPasswordResetForm'
})((0, _reactIntl.injectIntl)(RequestPasswordResetForm));

exports["default"] = _default;