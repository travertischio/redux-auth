'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('redux-form/immutable');

var _reactIntl = require('react-intl');

var _EmailField = require('react-form-fields/lib/EmailField');

var _EmailField2 = _interopRequireDefault(_EmailField);

var _PasswordField = require('react-form-fields/lib/PasswordField');

var _PasswordField2 = _interopRequireDefault(_PasswordField);

var _WrappedInput = require('../WrappedInput');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PropTypes from 'prop-types';
var SignInForm = function SignInForm(props) {
  var handleSubmit = props.handleSubmit,
      pristine = props.pristine,
      submitting = props.submitting,
      valid = props.valid;
  var formatMessage = props.intl.formatMessage;

  var emailLabel = formatMessage(_messages2.default.email);
  var passwordLabel = formatMessage(_messages2.default.password);

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
      name: 'email',
      label: emailLabel,
      placeholder: emailLabel,
      validate: [required, email],
      component: (0, _WrappedInput.ReduxFormInputWrapper)(_EmailField2.default)
    }),
    _react2.default.createElement(_immutable.Field, {
      name: 'password',
      type: 'password',
      label: passwordLabel,
      placeholder: passwordLabel,
      validate: [required],
      component: (0, _WrappedInput.ReduxFormInputWrapper)(_PasswordField2.default)
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
        'Sign In'
      )
    )
  );
};

// SignInForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   pristine: PropTypes.bool.isRequired,
//   submitting: PropTypes.bool.isRequired,
//   valid: PropTypes.bool.isRequired,
//   intl: PropTypes.object.isRequired,
// };

/**
*
* SignInForm
*
*/

exports.default = (0, _immutable.reduxForm)({
  form: 'signInForm'
})((0, _reactIntl.injectIntl)(SignInForm));

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