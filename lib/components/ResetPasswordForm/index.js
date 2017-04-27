'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minLength = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('redux-form/immutable');

var _reactIntl = require('react-intl');

var _WrappedInput = require('../WrappedInput');

var _WrappedInput2 = _interopRequireDefault(_WrappedInput);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: extract validation rules to seperate module
function required(value) {
  if (!value) {
    return 'Field required';
  }
  return undefined;
} /**
  *
  * ResetPasswordForm
  *
  */

function matchNewPasswordWithConfirmation(value, state) {
  var newPassword = state.get('new_password');
  var reNewPassword = state.get('re_new_password');

  if (newPassword !== reNewPassword) {
    return 'Password does not match the confirm password';
  }

  return undefined;
}

var minLength = exports.minLength = function minLength(min, label) {
  return function (value) {
    if (value && value.length < min) {
      return label ? label + ' must be ' + min + ' characters or more' : 'Must be ' + min + ' characters or more';
    }
    return undefined;
  };
};

function ResetPasswordForm(props) {
  var handleSubmit = props.handleSubmit,
      pristine = props.pristine,
      submitting = props.submitting,
      valid = props.valid;
  var formatMessage = props.intl.formatMessage;

  var newPasswordLabel = formatMessage(_messages2.default.newPasswordLabel);
  var newPasswordPlaceholder = formatMessage(_messages2.default.newPasswordPlaceholder);
  var reNewPassword = formatMessage(_messages2.default.reNewPassword);
  var reNewPasswordPlaceholder = formatMessage(_messages2.default.reNewPasswordPlaceholder);
  var minLengthOfPassword = minLength(6, newPasswordLabel);

  var onSubmit = function onSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (valid) {
      handleSubmit();
    }
  };

  return _react2.default.createElement(
    'form',
    { onSubmit: onSubmit, noValidate: true },
    _react2.default.createElement(_immutable.Field, {
      id: 'new_password',
      name: 'new_password',
      type: 'password',
      label: newPasswordLabel,
      placeholder: newPasswordPlaceholder,
      validate: [required, minLengthOfPassword],
      component: _WrappedInput2.default
    }),
    _react2.default.createElement(_immutable.Field, {
      id: 're_new_password',
      name: 're_new_password',
      type: 'password',
      label: reNewPassword,
      placeholder: reNewPasswordPlaceholder,
      validate: [required, matchNewPasswordWithConfirmation],
      component: _WrappedInput2.default
    }),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'button',
        {
          type: 'submit',
          disabled: pristine || submitting
        },
        'Save'
      )
    )
  );
}

ResetPasswordForm.propTypes = {
  handleSubmit: _react.PropTypes.func.isRequired,
  pristine: _react.PropTypes.bool.isRequired,
  submitting: _react.PropTypes.bool.isRequired,
  valid: _react.PropTypes.bool.isRequired,
  intl: _react.PropTypes.object.isRequired
};

exports.default = (0, _immutable.reduxForm)({
  form: 'resetPasswordForm'
})((0, _reactIntl.injectIntl)(ResetPasswordForm));