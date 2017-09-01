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

var _required = require('validators/lib/required');

var _email = require('validators/lib/email');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
*
* RequestPasswordResetForm
*
*/

function RequestPasswordResetForm(props) {
  var handleSubmit = props.handleSubmit,
      pristine = props.pristine,
      submitting = props.submitting,
      valid = props.valid;
  var formatMessage = props.intl.formatMessage;

  var emailLabel = formatMessage(_messages2.default.email);

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
      id: 'email',
      name: 'email',
      label: emailLabel,
      placeholder: emailLabel,
      validate: [_required.required, _email.email],
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
        'Submit'
      )
    )
  );
}

RequestPasswordResetForm.propTypes = {
  handleSubmit: _propTypes2.default.func.isRequired,
  pristine: _propTypes2.default.bool.isRequired,
  submitting: _propTypes2.default.bool.isRequired,
  valid: _propTypes2.default.bool.isRequired,
  intl: _propTypes2.default.object.isRequired
};

exports.default = (0, _immutable.reduxForm)({
  form: 'requestPasswordResetForm'
})((0, _reactIntl.injectIntl)(RequestPasswordResetForm));