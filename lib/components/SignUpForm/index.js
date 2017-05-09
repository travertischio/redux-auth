'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignUpForm = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('redux-form/immutable');

var _reactIntl = require('react-intl');

var _WrappedInput = require('../WrappedInput');

var _WrappedInput2 = _interopRequireDefault(_WrappedInput);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
*
* SignUp
*
*/

var SignUpForm = exports.SignUpForm = function SignUpForm(props) {
  // eslint-disable-line react/prefer-stateless-function
  var handleSubmit = props.handleSubmit,
      pristine = props.pristine,
      submitting = props.submitting,
      valid = props.valid;

  var formatMessage = props.intl.formatMessage;
  var firstNameLabel = formatMessage(_messages2.default.firstName);
  var emailLabel = formatMessage(_messages2.default.email);
  var passwordLabel = formatMessage(_messages2.default.password);
  var confirmPasswordLabel = formatMessage(_messages2.default.confirmPassword);

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
      id: 'firstName',
      name: 'first_name',
      type: 'text',
      label: firstNameLabel,
      placeholder: firstNameLabel,
      validate: [required],
      component: _WrappedInput2.default
    }),
    _react2.default.createElement(_immutable.Field, {
      id: 'email',
      name: 'email',
      type: 'email',
      label: emailLabel,
      placeholder: emailLabel,
      validate: [required, email],
      component: _WrappedInput2.default
    }),
    _react2.default.createElement(_immutable.Field, {
      id: 'password',
      name: 'password',
      type: 'password',
      label: passwordLabel,
      placeholder: passwordLabel,
      validate: [required],
      component: _WrappedInput2.default
    }),
    _react2.default.createElement(_immutable.Field, {
      id: 'confirmPassword',
      name: 'confirm_password',
      type: 'password',
      label: confirmPasswordLabel,
      placeholder: confirmPasswordLabel,
      validate: [required],
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
        'Sign Up'
      )
    )
  );
};

SignUpForm.propTypes = {
  handleSubmit: _propTypes2.default.func.isRequired,
  pristine: _propTypes2.default.bool.isRequired,
  submitting: _propTypes2.default.bool.isRequired,
  valid: _propTypes2.default.bool.isRequired,
  intl: _propTypes2.default.object.isRequired
};

exports.default = (0, _immutable.reduxForm)({
  form: 'signUpForm'
})((0, _reactIntl.injectIntl)(SignUpForm));

// TODO: extract validation rules to seperate module

function required(value) {
  if (!value) {
    return 'Field required';
  }
  return undefined;
}

function email(value) {
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value)) {
    return 'Email format invalid';
  }
  return undefined;
}