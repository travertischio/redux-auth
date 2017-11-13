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

var _reduxForm = require('react-form-fields/lib/TextField/reduxForm');

var _reduxForm2 = _interopRequireDefault(_reduxForm);

var _required = require('validators/lib/required');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SignInConfirmCodeForm = function SignInConfirmCodeForm(props) {
  var pristine = props.pristine,
      submitting = props.submitting;
  var formatMessage = props.intl.formatMessage;

  var codeLabel = formatMessage(_messages2.default.code);

  var handleSubmit = function handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    props.handleSubmit();
  };

  return _react2.default.createElement(
    'form',
    { onSubmit: handleSubmit, noValidate: true },
    _react2.default.createElement(_immutable.Field, {
      name: 'code',
      id: 'code',
      label: codeLabel,
      placeholder: codeLabel,
      validate: [_required.required],
      component: _reduxForm2.default
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
}; /**
   *
   * SignInConfirmCodeForm
   *
   */

SignInConfirmCodeForm.propTypes = {
  handleSubmit: _propTypes2.default.func.isRequired,
  pristine: _propTypes2.default.bool.isRequired,
  submitting: _propTypes2.default.bool.isRequired,
  intl: _propTypes2.default.object.isRequired
};

exports.default = (0, _immutable.reduxForm)({
  form: 'signInConfirmCodeForm'
})((0, _reactIntl.injectIntl)(SignInConfirmCodeForm));