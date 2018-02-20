'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIntl = require('react-intl');

var _immutable = require('redux-form/immutable');

var _reduxForm = require('react-form-fields/lib/EmailField/reduxForm');

var _reduxForm2 = _interopRequireDefault(_reduxForm);

var _reduxForm3 = require('react-form-fields/lib/PasswordField/reduxForm');

var _reduxForm4 = _interopRequireDefault(_reduxForm3);

var _field = require('../Captcha/field');

var _field2 = _interopRequireDefault(_field);

var _required = require('validators/lib/required');

var _email = require('validators/lib/email');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var emailLabel = formatMessage(_messages2.default.email);
  var passwordLabel = formatMessage(_messages2.default.password);

  var onSubmit = function onSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    handleSubmit();
  };

  return _react2.default.createElement(
    'form',
    { onSubmit: onSubmit, noValidate: true },
    _react2.default.createElement(_immutable.Field, {
      name: 'email',
      id: 'email',
      label: emailLabel,
      placeholder: emailLabel,
      validate: [_required.required, _email.email],
      component: _reduxForm2.default
    }),
    _react2.default.createElement(_immutable.Field, {
      name: 'password',
      id: 'password',
      label: passwordLabel,
      placeholder: passwordLabel,
      validate: [_required.required],
      component: _reduxForm4.default
    }),
    captchaRequired && _react2.default.createElement(_immutable.Field, {
      name: 'captcha',
      validate: [_required.required],
      component: _field2.default
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

SignInForm.propTypes = {
  captchaRequired: _propTypes2.default.bool,
  handleSubmit: _propTypes2.default.func.isRequired,
  intl: _propTypes2.default.object.isRequired,
  pristine: _propTypes2.default.bool.isRequired,
  submitting: _propTypes2.default.bool.isRequired
};

SignInForm.defaultProps = {
  captchaRequired: false
};

exports.default = (0, _immutable.reduxForm)({
  form: 'signInForm'
})((0, _reactIntl.injectIntl)(SignInForm));