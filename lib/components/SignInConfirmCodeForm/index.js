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

var _reduxForm = _interopRequireDefault(require("react-form-fields/lib/TextField/reduxForm"));

var _required = require("validators/lib/required");

var _messages = _interopRequireDefault(require("./messages"));

/**
*
* SignInConfirmCodeForm
*
*/
var SignInConfirmCodeForm = function SignInConfirmCodeForm(props) {
  var pristine = props.pristine,
      submitting = props.submitting;
  var formatMessage = props.intl.formatMessage;
  var codeLabel = formatMessage(_messages["default"].code);

  var handleSubmit = function handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    props.handleSubmit();
  };

  return _react["default"].createElement("form", {
    onSubmit: handleSubmit,
    noValidate: true
  }, _react["default"].createElement(_immutable.Field, {
    name: "code",
    id: "code",
    label: codeLabel,
    placeholder: codeLabel,
    validate: [_required.required],
    component: _reduxForm["default"]
  }), _react["default"].createElement("div", null, _react["default"].createElement("button", {
    type: "submit",
    disabled: pristine || submitting
  }, "Sign In")));
};

var _default = (0, _immutable.reduxForm)({
  form: 'signInConfirmCodeForm'
})((0, _reactIntl.injectIntl)(SignInConfirmCodeForm));

exports["default"] = _default;